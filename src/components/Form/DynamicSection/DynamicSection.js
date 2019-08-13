import React, { useCallback, useEffect, useState, useRef } from 'react'
import shortid from 'shortid'
import { Button } from '../../Button'
import { Form } from '../../Form'
import { useFormInput } from '../../../hooks'

const handleRefUpdate = (ref, form, errors) => {
  ref.current.form = form
  ref.current.errors = errors
}

export const DynamicSection = props => {
  const { addLabel, Section, path } = props
  const [sections, setSections] = useState([])
  const state = useRef({
    form: {},
    errors: {}
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

  const {
    onChange
  } = useFormInput({
    path,
    extractor: () => {
      return state.current
    }
  })

  useEffect(() => {

  }, [sections])

  return (
    <>
      <Form
        onChange={({ form, errors }) => {
          handleRefUpdate(state, form, errors)
          onChange(null, state.current)
        }}
        id={55}
      >
        {sections.map(item => React.cloneElement(item, { handleDelete }))}
      </Form>
      <Button onClick={handleAddSection} label={addLabel} ariaLabel={addLabel} />
    </>
  )
}
