import React, { useCallback, useEffect, useState, useRef } from 'react'
import shortid from 'shortid'
import { Button } from '../Button/Button'
import { Form } from '../Form/Form'
import { useFormInput } from '../../hooks'
import isEqual from 'lodash/isEqual'
import { Dictionary } from '../../utils/helper.types'

interface DynamicSectionProps {
  addLabel: string
  Section: React.FunctionComponent<{ id: string }>
  path: string
}

type DynamicSection = React.FunctionComponent<DynamicSectionProps>

const transformer = (state: any) => {
  const current = JSON.parse(JSON.stringify(state))
  const form = { ...current.form } as Dictionary<any>
  const errors = { ...current.errors } as Dictionary<any>
  Object.keys(form).forEach(key => {
    form[key].__errors = errors[key] ?? {}
  }, {})

  Object.keys(errors).forEach(key => {
    if (form[key]) {
      form[key].__errors = errors[key]
    } else {
      form[key] = {
        __errors: errors[key]
      }
    }
  })

  return Object.values(form)
}

export const DynamicSection: DynamicSection = props => {
  const { addLabel, Section, path } = props
  const [sections, setSections] = useState<JSX.Element[]>([])
  const state = useRef({
    form: {} as any,
    errors: {} as any
  })

  const handleDelete = useCallback((id) => {
    const sectionIndex = sections.findIndex(item => item.key === id)
    setSections(sections => {
      sections.splice(sectionIndex, 1)
      return [...sections]
    })
    delete state.current.form[id]
    delete state.current.errors[id]
  }, [sections, setSections])

  const handleAddSection = useCallback(() => {
    setSections(sections => {
      const id = shortid.generate()
      sections.push(<Section id={id} key={id} />)
      return [...sections]
    })
  }, [setSections])

  const extractor = useCallback(() => {
    return state.current
  }, [])

  const {
    onChange
  } = useFormInput({
    path,
    extractor,
    transformer
  })

  useEffect(() => {

  }, [sections])

  return (
    <>
      <Form
        webForm={false}
        onChange={({ form, errors }) => {
          if (!isEqual({ form, errors }, state.current)) {
            onChange(state.current)
          }
          state.current.form = form
          state.current.errors = errors
        }}
      >
        {sections.map(item => React.cloneElement(item, { handleDelete }))}
      </Form>
      <Button onClick={handleAddSection} label={addLabel} ariaLabel={addLabel} />
    </>
  )
}
