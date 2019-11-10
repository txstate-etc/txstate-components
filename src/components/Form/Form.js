import React, { useImperativeHandle, useCallback, useEffect, useMemo } from 'react'
import { clone, debounce, get, set } from 'lodash'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs'
import { skip } from 'rxjs/operators'

export const FormValueContext = React.createContext()
export const FormErrorContext = React.createContext()
export const FormRegistrationContext = React.createContext()
export const FormHasInitialValuesContext = React.createContext(false)

// TODO: Add index ordering to the form inputs that register with the form.
export const Form = React.forwardRef((props, ref) => {
  const {
    children,
    onSubmit,
    onChange,
    validate,
    validationDelay = 300,
    initialValues,
    id
  } = props

  const valueSubject = useMemo(() => new BehaviorSubject(initialValues || {}), [])
  const errorSubject = useMemo(() => new BehaviorSubject({}), [])
  const registrationSubject = useMemo(() => new BehaviorSubject([]), [])
  useEffect(() => () => {
    valueSubject.complete()
    errorSubject.complete()
    registrationSubject.complete()
  }, [])

  const getFormValue = () => {
    const ret = clone(valueSubject.value)
    for (const reg of registrationSubject.value) {
      if (typeof reg.transformer === 'function') {
        const val = get(ret, reg.path)
        if (typeof val !== 'undefined') set(ret, reg.path, reg.transformer(val))
      }
    }
    return ret
  }

  const submitForm = useCallback(async () => {
    if (onSubmit && typeof onSubmit === 'function') {
      try {
        const results = await onSubmit({ form: getFormValue(), errors: errorSubject.value.errors, success: errorSubject.value.success })
        errorSubject.next({
          errors: get(results, 'errors'),
          success: get(results, 'success')
        })
      } catch (results) {
        errorSubject.next({
          errors: get(results, 'errors'),
          success: get(results, 'success')
        })
      }
    }
  }, [onSubmit, errorSubject])

  const update = useCallback((data) => valueSubject.next(data), [])
  const updatePath = useCallback((path, value) => {
    update(set(valueSubject.value, path, value))
  })
  useImperativeHandle(ref, () => ({ submit: submitForm, update, updatePath }))

  useEffect(() => {
    let validationversion = 0
    const subscription = valueSubject.pipe(skip(1)).subscribe(debounce(async (data) => {
      try {
        if (typeof validate !== 'function') return
        const form = getFormValue()
        validationversion++
        const savevalidationversion = validationversion
        const results = await validate(form)
        if (validationversion === savevalidationversion) {
          errorSubject.next({
            errors: get(results, 'errors'),
            success: get(results, 'success')
          })
          if (onChange && typeof onChange === 'function') {
            onChange({ form, errors: errorSubject.value.errors, success: errorSubject.value.success })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }, validationDelay))
    return () => subscription.unsubscribe()
  }, [valueSubject, errorSubject, registrationSubject])

  return (
    <FormValueContext.Provider value={valueSubject}>
      <FormErrorContext.Provider value={errorSubject}>
        <FormRegistrationContext.Provider value={registrationSubject}>
          <FormHasInitialValuesContext.Provider value={initialValues && true}>
            <form id={id} onSubmit={e => {
              e.preventDefault()
              submitForm && submitForm()
            }}>
              {children}
            </form>
          </FormHasInitialValuesContext.Provider>
        </FormRegistrationContext.Provider>
      </FormErrorContext.Provider>
    </FormValueContext.Provider>
  )
})

Form.propTypes = {
  /** This function is run when the form's submit function is called */
  onSubmit: PropTypes.func,
  /** Runs on every change of the form */
  onChange: PropTypes.func,
  /** Runs on every change, return value is used to display errors in components */
  validate: PropTypes.func,
  /** Sets the initial form state */
  initialValues: PropTypes.object,
  /** An optional ID which will be used instead of a randomly generated id */
  id: PropTypes.string,
  /** The amount of time to wait, in milliseconds, before calling the validation function */
  validationDelay: PropTypes.number
}
