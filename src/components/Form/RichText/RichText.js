import React from 'react'
import { useFormInput } from '../../../hooks'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from '../../Editor'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../ErrorMessage'

export const RichText = props => {
  const { path, className } = props
  const {
    value,
    error,
    success,
    onChange
  } = useFormInput({
    path,
    transformer: (editorState) => {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    },
    extractor: editorState => editorState
  })

  return <React.Fragment>
    <Editor
      className={className}
      value={value}
      onChange={onChange}
    />
    <ErrorMessage error={error} success={success} />
  </React.Fragment>
}

RichText.propTypes = {
  path: PropTypes.string.isRequired
}
