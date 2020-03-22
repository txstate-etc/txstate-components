/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useCallback } from 'react'
import { useOptionalId } from '../../hooks/useOptionalId'
import { labelStyle, inputStyle } from '../Common/common.styles'
import { classNames } from '../../utils'
import { Theme } from '../../utils/Theme'

const containerStyle = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: block;
  position: relative;
  width: fit-content;
`

interface MultiSelectProps {
  id?: string
  label?: string
  className?: string
  placeholder?: string
  style?: React.CSSProperties
}

type MultiSelect = React.FunctionComponent<MultiSelectProps>

const selectItems = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${Theme.white.hex()};

  padding: 4px;
  border: solid 2px #606060;
  
  &.shut {
    display: none;
  }
`
export const MultiSelect: MultiSelect = props => {
  const { label, placeholder, className, style } = props
  const id = useOptionalId(props.id)
  const [showSelectList, setShowSelectList] = useState(false)

  const toggleSelectList = useCallback(() => {
    setShowSelectList(current => !current)
  }, [])

  return (
    <div
      style={style}
      className={className}
      css={containerStyle}
    >
      { label && <label css={css`
        ${labelStyle}
        display: block;
      `} htmlFor={id}>{label}</label>}
      <input
        placeholder={placeholder}
        onFocus={toggleSelectList}
        css={inputStyle}
        type="text"
        id={id}
      />
      <div role='listbox' css={selectItems} className={classNames({ shut: !showSelectList }, 'select-list')} aria-label='options'>
        <div css={css`
          padding: 2px;
          margin: 0;
          background-color: transparent;
          border: none;
          display: inline-table;
          width: 100%;
          text-align: left;

          cursor: pointer;

          &::-moz-focus-inner {
            border: none;
          }

          &:focus {
            outline: solid 2px ${Theme.maroon.hex()};
          }
        `}>Test</div>
      </div>
    </div>
  )
}
