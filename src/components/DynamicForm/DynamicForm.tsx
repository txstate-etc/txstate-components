import { nanoid } from 'nanoid'
import React, { useReducer } from 'react'
import { useFormInput } from '../../hooks'
import { Form } from '../Form/Form'
import { FormRef } from '../Form/Form.types'

type Section = React.ElementType<{ onRemove: (key: string) => void, dataKey: string }>

interface DynamicFormProps {
  path: string
  section: Section
  controls: React.ElementType<{ onAdd: () => void }>
}

interface DynamicFormSectionProps {}

type DynamicForm = React.FunctionComponent<DynamicFormProps> & { Section: React.FunctionComponent<DynamicFormSectionProps> }

const extractor = (e: any) => e.form

const onRemove = (sections: JSX.Element[], key: string) => {
  return sections.filter(section => section.key !== key)
}

type Action = {
  dispatch?: (action: Action) => void,
  payload: {
    section?: any,
    id: string,
  }
  type: string
}
type Reducer<T> = (initial: T[], action: Action) => void

const sectionReducer = (sections: JSX.Element[], action: Action): JSX.Element[] => {
  if (action.type === 'add') {
    const section = action.payload.section ?? null
    if (!section) throw new Error('Section is required to render')

    const newSections = [
      ...sections,
      section
    ]
    return newSections
  } else if (action.type === 'remove') {
    return sections.filter((section: any) => section.props.dataKey !== action.payload.id)
  } else {
    return sections
  }
}

export const DynamicForm: DynamicForm = (props) => {
  const { path, section, controls: Controls } = props
  const [sections, dispatch] = useReducer(sectionReducer, [])
  const formRef = React.useRef<FormRef>(null)

  const {
    value,
    onChange
  } = useFormInput({
    path,
    extractor
  })

  const addSection = React.useCallback(() => {
    const id = nanoid(10)
    const updateValues = {
      ...value,
      [id]: null
    }
    const Section = section
    const newSection = <Section
      dataKey={id}
      key={id}
      onRemove={() => {
        console.log(formRef.current, id)
        formRef.current && formRef.current.updatePath(`${id}`, undefined, 'remove')
        dispatch({ type: 'remove', payload: { id } })
      }}
    />
    onChange({ form: updateValues })
    dispatch({
      type: 'add',
      payload: {
        section: newSection,
        id
      },
      dispatch
    })
  }, [dispatch, section, onChange, value])

  const onAdd = React.useCallback(() => {
    addSection()
  }, [addSection])

  return (
    <Form
      ref={formRef}
      webForm={false}
      onChange={onChange}
    >
      {sections}
      <Controls
        onAdd={onAdd}
      />
    </Form>
  )
}

DynamicForm.Section = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
DynamicForm.Section.displayName = 'DynamicFormSection'
