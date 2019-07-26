import * as React from 'react'

interface ButtonProps {
  ariaLabel: string
  label: string
  variant: 'primary' | 'outline' | 'transparent'
  onClick: (event: React.SyntheticEvent) => void
}

export declare const Button: React.FunctionComponent<ButtonProps>

type AlignmentOption = 'start' | 'center' | 'end' | 'around' | 'even' | 'between'

interface StackProps {
  horizontal: boolean
  horizontalAlign: AlignmentOption
  verticalAlign: AlignmentOption
  spacing: number
}

export declare const Stack: React.FunctionComponent<StackProps>

type Column = {
  key: string
  fieldName: string
  name?: string
  ariaLabel?: string
  filterAriaLabel?: string
  maxWidth?: number
  minWidth?: number
  onColumnClick?: (event: React.MouseEvent<HTMLElement>, column: Column) => void
  onRender?: (item?: any, index?: number, column?: Column) => any
}

interface ListProps {
  dataSource: () => Promise<Array<T>>
  columns: Array<Column>
}

export declare const List: React.FunctionComponent<ListProps>

interface TextProps {
  renderAs: string
}

export declare const Text: React.FunctionComponent<TextProps>
