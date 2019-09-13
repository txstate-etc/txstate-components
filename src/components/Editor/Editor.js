import React from 'react'
import { Editor as Wysiwyg } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Editor.css'

const TOOLBAR_OPTIONS = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'remove',
    'history'
  ]
}

export const Editor = props => {
  const { onChange, value, className } = props
  return <Wysiwyg
    toolbar={TOOLBAR_OPTIONS}
    toolbarClassName='toolbarClassName'
    wrapperClassName={`wrapper ${className}`}
    editorClassName={`editor`}
    editorState={value}
    onEditorStateChange={onChange}
  />
}

Editor.defaultProps = {
  onChange: value => value,
  value: EditorState.createEmpty()
}
