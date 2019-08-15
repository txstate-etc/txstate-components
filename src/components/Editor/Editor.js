import React from 'react'
import { Editor as Wysiwyg } from 'react-draft-wysiwyg'
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
  return (
    <Wysiwyg
      toolbar={TOOLBAR_OPTIONS}
      toolbarClassName='toolbarClassName'
      wrapperClassName='wrapperClassName'
      editorClassName='editor'
    />
  )
}
