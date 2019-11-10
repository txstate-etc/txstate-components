import { useContext, useEffect, useCallback, useMemo } from 'react'
import { FormValueContext, FormErrorContext, FormRegistrationContext, FormHasInitialValuesContext } from '../components/Form'
import { useDerivedSubFromContext, useDerivedSubjectFromContext, useDerivedSub } from '.'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  let firstrun = false
  useMemo(() => { firstrun = true }, [firstrun])
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
  const isDirty = useDerivedSub(registrationSubject, registrationList => {
    for (let i = registrationList.length - 1; i >= 0; i--) {
      if (registrationList[i].isDirty) return true
      if (registrationList[i].path === path) return false
    }
    return false
  })

  const onBlur = useCallback(() => {
    for (const reg of registrationSubject.value) {
      if (reg.path === path && !reg.isDirty) {
        reg.isDirty = true
        registrationSubject.next(registrationSubject.value)
      }
    }
  }, [registrationSubject])

  const onChange = useCallback((...args) => {
    const newvalue = typeof extractor === 'function' ? extractor(...args) : (args[0].target ? args[0].target.value : args[0])
    setValue(newvalue)
    onBlur()
  }, [onBlur, setValue])

  useEffect(() => {
    let found = false
    for (const reg of registrationSubject.value) {
      if (reg.path === path) {
        reg.transformer = transformer
        reg.onChange = onChange
        reg.initialValue = initialValue
        found = true
      }
    }
    if (!found) registrationSubject.value.push({ path, isDirty: false, transformer, onChange, initialValue })
    registrationSubject.next(registrationSubject.value)
  }, [transformer, onChange, initialValue])

  return {
    onChange,
    onBlur,
    isDirty,
    value,
    error,
    success
  }
}
