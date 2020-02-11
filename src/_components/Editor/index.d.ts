import * as React from 'react'
import { EditorState } from 'draft-js'

interface IEditorProps {
  onChange?: (value: any) => any
  value?: EditorState,
  customOptions?: React.ElementType[]
}

export const Editor: React.FC<IEditorProps>

