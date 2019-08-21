import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../../hooks'
import { Subject } from '../../utils'
import set from 'lodash.set'
import unset from 'lodash.unset'
import clone from 'lodash.clone'
import uuid from 'uuid/v4'

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
    initialValues,
    id
  } = props
  const formEvent = useRef(id || uuid())
  const _initialState = useRef(initialValues || {})

  const [form, formDispatch] = useReducer(immutableReducer, _initialState.current)
  const [errors, errorDispatch] = useReducer(immutableReducer, {})

  const handleChildData = useCallback(({ path, value, inputEvent, transformer }) => {
    if (!path) return
    let transformedValue = value
    if (transformer && typeof transformer === 'function') {
      transformedValue = transformer(value)
    }
    formDispatch({ type: 'set', path, payload: transformedValue })
    Subject.next(inputEvent, value)
  }, [formDispatch])

  const handleChildError = useCallback(({ type, path, error }) => {
    if (!path) return
    errorDispatch({ type, path, payload: error })
  })

  useEvent(`${formEvent.current}-data`, handleChildData)
  useEvent(`${formEvent.current}-error`, handleChildError)

  const notifyChildrenReady = useCallback(useEvent(`${formEvent.current}-form-ready`), [])

  useEffect(() => {
    notifyChildrenReady(_initialState.current)
  }, [notifyChildrenReady])

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
