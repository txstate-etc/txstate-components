import React from 'react'
import { useFormInput } from '../../../hooks'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from '../../Editor'

export const RichText = props => {
  const { path, onGetErrorMessage } = props
  const {
    value,
    onChange
  } = useFormInput({
    path,
    onGetErrorMessage,
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
