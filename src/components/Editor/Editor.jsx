import React from 'react'
import { Editor as Wysiwyg } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'

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

const RichTextEditor = props => {
  const { onChange, value, className, customOptions } = props
  const wrapperClassNames = ['wrapper', className].filter(str => !!str)
  const editorClassNames = ['editor', className].filter(str => !!str)
  const toolbarClassNames = ['toolbar', className].filter(str => !!str)
  return <Wysiwyg
    toolbar={TOOLBAR_OPTIONS}
    toolbarClassName={toolbarClassNames.join(' ')}
    wrapperClassName={wrapperClassNames.join(' ')}
    editorClassName={editorClassNames.join(' ')}
    toolbarCustomButtons={customOptions.map((Option, index) => <Option key={index} />)}
    editorState={value}
    onEditorStateChange={onChange}
  />
}

RichTextEditor.defaultProps = {
  onChange: value => value,
  value: EditorState.createEmpty(),
  customOptions: []
}

export const Editor = styled(RichTextEditor)`
  &.editor {
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    flex: 1;
    min-height: 300px;
    padding-left: 4px;
    font-family: 'sans-serif'
  }

  &.wrapper {
    display: flex;
    flex-direction: column;
  }
`
