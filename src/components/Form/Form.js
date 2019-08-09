import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../../hooks'
import { Subject } from '../../utils'
import set from 'lodash.set'
import unset from 'lodash.unset'
import clone from 'lodash.clone'
import uuid from 'uuid/v4'

/**
 * - lodash set for setting fields
 * - No validation on first load
 * - onBlur should be validated on that element
 * - onSubmit on all elements
 * - onChange - validate currently changing element
 *
 * - enter can submit
 * - Accessibility: invisible labels (aria-label)
 * - Generic Add More component
 */

export const FormContext = React.createContext({})

const immutableReducer = (state, action) => {
  let localState = null
  switch (action.type) {
    case 'set':
      localState = clone(state)
      const localValue = clone(action.payload)
      return set(localState, action.path, localValue)
    case 'remove':
      localState = clone(state)
      unset(localState, action.path)
      return localState
    default:
      return state
  }
}

export const Form = React.forwardRef((props, ref) => {
  const {
    children,
    onSubmit,
    onChange,
    validate,
    id
  } = props
  const formEvent = useRef(id || uuid())

  const [form, formDispatch] = useReducer(immutableReducer, {})
  const [errors, errorDispatch] = useReducer(immutableReducer, {})

  const handleChildData = useCallback(({ path, value, inputEvent }) => {
    if (!path) return
    formDispatch({ type: 'set', path, payload: value })
    Subject.next(inputEvent, value)
  }, [formDispatch])

  const handleChildError = useCallback(({ type, path, error }) => {
    if (!path) return

    errorDispatch({ type, path, payload: error })
  })

  useEvent(`${formEvent.current}-data`, handleChildData)
  useEvent(`${formEvent.current}-error`, handleChildError)

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (onSubmit && typeof onSubmit === 'function') {
        let isValid = true
        if (validate && typeof validate === 'function') {
          isValid = await validate(form)
        }

        if (isValid) {
          onSubmit({ form, errors })
        }
      }
    }
  }))

  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange({ form, errors })
    }
  }, [form, errors, onChange])

  return (
    <FormContext.Provider value={formEvent.current}>
      {children}
    </FormContext.Provider>
  )
})

Form.defaultProps = { name: 'five' }
