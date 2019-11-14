import React, { useCallback, useRef } from 'react'
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers'
import { Label } from '../Label'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Theme } from '../Theme'
import toString from 'lodash/toString'
import get from 'lodash/get'
import differenceBy from 'lodash/differenceBy'

const Desc = styled.div`
  font-size: 12px;
  font-family: 'Univers W01', Helvetica, Calibri, Arial, sans-serif;
  color: ${Theme.charcoal.lighten(1).hex()};
  line-height: 20px;
  margin-bottom: ${({ show }) => (show ? '10px' : '')};
`

const listContainsDocument = (item, itemList) => {
  if (!itemList || !itemList.length || itemList.length === 0) {
    return false
  }
  return itemList.filter(compareTag => compareTag.key === item.key).length > 0
}

const searchByName = (items, value) => {
  if (!Array.isArray(items) || !value) return items

  const search = toString(value).toLowerCase()
  return items.filter(item => {
    const name = get(item, 'name', '')
    return name.toLowerCase().includes(search)
  })
}

export const BasePicker = props => {
  const {
    ariaLabel,
    label,
    items,
    disabled,
    canSelectDuplicates,
    showSelectedItems,
    onResolveItems,
    onItemSelected,
    itemLimit,
    getTextFromItem,
    value,
    className,
    onChange,
    description,
    onRenderItem
  } = props

  const tagPicker = useRef()

  const defaultOnResolveItems = useCallback((filteredText, selectedItems) => {
    if (showSelectedItems && filteredText) {
      return searchByName(items, filteredText)
    } else if (!filteredText && !showSelectedItems) {
      const newItems = differenceBy(items, selectedItems, 'key')
      return newItems
    } else if (!filteredText && showSelectedItems) {
      return items
    } else if (!showSelectedItems && filteredText) {
      const search = toString(filteredText).toLowerCase()
      return items.filter(item => {
        const name = get(item, 'name', '').toLowerCase()
        const searchMatch = name.includes(search)
        const notSelected = selectedItems.findIndex(({ key }) => key === item.key) < 0
        return searchMatch && notSelected
      })
    }
  }, [items, showSelectedItems])

  const handleOnResolveSuggestions = useCallback((selectedItems) => {
    if (onResolveItems) {
      return onResolveItems(selectedItems)
    } else {
      return defaultOnResolveItems(null, selectedItems)
    }
  }, [defaultOnResolveItems, onResolveItems])

  const defaultOnItemSelected = useCallback((item) => {
    if (canSelectDuplicates) return item
    if (listContainsDocument(item, tagPicker.current.items)) return null

    return item
  }, [items, tagPicker.current, canSelectDuplicates])

  return (
    <>
      <Label>{label}</Label>
      <Desc show={description}>{description}</Desc>
      <TagPicker
        className={className}
        selectedItems={value}
        onChange={onChange}
        onRenderItem={onRenderItem}
        componentRef={tagPicker}
        onResolveSuggestions={onResolveItems || defaultOnResolveItems}
        onEmptyResolveSuggestions={handleOnResolveSuggestions}
        onItemSelected={onItemSelected || defaultOnItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={{
          suggestionsHeaderText: 'Suggested Items',
          noResultsFoundText: 'No Items Found'
        }}
        itemLimit={itemLimit}
        disabled={disabled}
        inputProps={{
          'aria-label': ariaLabel
        }}
      />
    </>
  )
}

BasePicker.defaultProps = {
  items: [],
  disabled: false,
  showSelectedItems: true,
  canSelectDuplicates: false
}

BasePicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired })),
  ariaLabel: PropTypes.string.isRequired,
  showSelectedItems: PropTypes.bool,
  onResolveItems: PropTypes.func,
  onItemSelected: PropTypes.func,
  getTextFromItem: PropTypes.func,
  itemLimit: PropTypes.number,
  disabled: PropTypes.bool,
  canSelectDuplicates: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired })),
  onChange: PropTypes.func,
  onRenderItem: PropTypes.func,
  description: PropTypes.string
}
