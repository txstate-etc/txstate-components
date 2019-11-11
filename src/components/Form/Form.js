import React, { useImperativeHandle, useCallback, useEffect, useMemo } from 'react'
import { clone, debounce, get, set } from 'lodash'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs'
import { skip } from 'rxjs/operators'

export const FormValueContext = React.createContext()
export const FormErrorContext = React.createContext()
export const FormRegistrationContext = React.createContext()
export const FormHasInitialValuesContext = React.createContext(false)

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

  // when we call our consumer's validate or onSubmit function, we need
  // to make sure we apply the transformer, if any, for each registered input
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
      } finally {
        // mark all inputs dirty so that they show errors from now on
        registrationSubject.next(registrationSubject.value.map(reg => ({ ...reg, isDirty: true })))
      }
    }
  }, [onSubmit, errorSubject])

  // provide some utility functions on our ref, for use by our consumer
  // NOTE: updating a path that uses a transformer function will be confusing
  // as we have no way to un-transform the value sent to updatePath
  // it will be up to the consumer to send a value in the storage format, NOT the
  // format sent to validate and onSubmit
  const updatePath = useCallback((path, value) => {
    valueSubject.next(set(valueSubject.value, path, value))
  }, [valueSubject])
  useImperativeHandle(ref, () => ({ submit: submitForm, updatePath }))

  // subscribe to valueSubject so that we can call our consumer's validate and
  // onChange functions and feed the results to the errorSubject
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
  }, [valueSubject, errorSubject])

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
