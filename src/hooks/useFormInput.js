import { useContext, useCallback, useMemo } from 'react'
import { FormValueContext, FormErrorContext, FormRegistrationContext, FormHasInitialValuesContext } from '../components/Form'
import { useDerivedSubFromContext, useDerivedSubjectFromContext, useDerivedSub } from '.'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  // a little trick so that we know whether we're on the first render
  let firstrun = false
  useMemo(() => { firstrun = true }, [firstrun])

  // subscribe to value and set initialValue if we're on the first render
  // and the consumer didn't set initialValues on the form itself
  const hasInitialValues = useContext(FormHasInitialValuesContext)
  const useValue = useDerivedSubjectFromContext(FormValueContext, path)
  let value = useValue[0] || ''
  const setValue = useValue[1]
  if (firstrun && initialValue && !hasInitialValues) {
    setValue(initialValue)
    value = initialValue
  }

  const error = useDerivedSubFromContext(FormErrorContext, 'errors.' + path)
  const success = useDerivedSubFromContext(FormErrorContext, 'success.' + path)

  const registrationSubject = useContext(FormRegistrationContext)

  const onBlur = useCallback(() => {
    // mark us as dirty along with everything above us
    for (const reg of registrationSubject.value) {
      reg.isDirty = true
      if (reg.path === path && !reg.isDirty) {
        registrationSubject.next(registrationSubject.value)
        break
      }
    }
  }, [registrationSubject])

  const onChange = useCallback((...args) => {
    const newvalue = typeof extractor === 'function' ? extractor(...args) : (args[0].target ? args[0].target.value : args[0])
    setValue(newvalue)
    onBlur()
  }, [onBlur, setValue])

  const registrationorder = useMemo(() => {
    for (let i = 0; i < registrationSubject.value.length; i++) {
      const reg = registrationSubject.value[i]
      if (reg.path === path) {
        reg.transformer = transformer
        reg.onChange = onChange
        reg.initialValue = initialValue
        registrationSubject.next(registrationSubject.value)
        return i
      }
    }
    // not registered yet
    registrationSubject.value.push({ path, isDirty: false, transformer, onChange, initialValue })
    registrationSubject.next(registrationSubject.value)
    return registrationSubject.value.length - 1
  }, [path, onChange, initialValue, transformer, registrationSubject])

  const isDirty = useDerivedSub(registrationSubject, registrationList => {
    return registrationList[registrationorder]
  })

  return {
    onChange,
    onBlur,
    isDirty,
    value,
    error: isDirty && error,
    success: isDirty && success
  }
}
