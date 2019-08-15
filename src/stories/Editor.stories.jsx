import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Editor } from '../components'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw, EditorState } from 'draft-js'

const EditorExample = props => {
  const [value, setValue] = useState(EditorState.createEmpty())
  const onChange = (editorState) => {
    setValue(editorState)
  }

  return (
    <div style={{ padding: 25 }}>
      <Editor
        onChange={onChange}
        value={value}
      />
      <div
        style={{ marginTop: 12 }}
        dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(value.getCurrentContent())) }}
      />
    </div>
  )
}

storiesOf('Editor', module)
  .add('basic', () => <EditorExample />)
