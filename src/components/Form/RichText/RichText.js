import React from 'react'
import { useFormInput } from '../../../hooks'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from '../../Editor'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../ErrorMessage'

export const RichText = props => {
  const { path, className, customOptions } = props
  const {
    value,
    error,
    success,
    onChange,
    errClass
  } = useFormInput({
    path,
    transformer: (editorState) => {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    },
    extractor: editorState => editorState
  })

  return (
    <React.Fragment>
      <Editor
        className={[className, errClass].join(' ')}
        customOptions={customOptions}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage error={error} success={success} />
    </React.Fragment>
  )
}

RichText.propTypes = {
  path: PropTypes.string.isRequired,
  customOptions: PropTypes.arrayOf(PropTypes.elementType)
}
