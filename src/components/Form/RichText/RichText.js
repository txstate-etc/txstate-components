import React from 'react'
import { useFormInput } from '../../../hooks'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from '../../Editor'
import PropTypes from 'prop-types'

export const RichText = props => {
  const { path } = props
  const {
    value,
    onChange
  } = useFormInput({
    path,
    transformer: (editorState) => {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    },
    extractor: editorState => editorState
  })

  return (
    <Editor
      value={value}
      onChange={onChange}
    />
  )
}

RichText.propTypes = {
  path: PropTypes.string.isRequired
}
