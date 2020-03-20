/** @jsx jsx */
import { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { Maybe } from '../../utils/helper.types'
import { classNames } from '../../utils'
import { Theme } from '../../utils/Theme'
import { DropdownItem } from './DropdownItem'
import { DropdownItemContent } from './Dropdown'

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

interface DropdownListProps {
  items: Maybe<DropdownItemContent[]>
  handleSelect: (item: { key: string, text: string }, index: number) => () => void
  showItems: boolean
  focused: number
}

type DropdownList = React.FunctionComponent<DropdownListProps>

export const DropdownList: DropdownList = props => {
  const { handleSelect, showItems, focused } = props
  const items = props.items ?? []

  return showItems ? (
    <div role='listbox' css={selectItems} className={classNames({ shut: !showItems }, 'select-list')} aria-label='options'>
      {
        items.map((item, index) => {
          return (
            <DropdownItem
              focused={index === focused}
              key={item.key}
              id={item.key}
              handleSelect={handleSelect(item, index)}
              text={item.text}
            />
          )
        })
      }
    </div>
  ) : null
}
