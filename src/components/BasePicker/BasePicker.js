import React, { useCallback, useRef } from 'react'
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers'
import { Label } from '../Label'
import PropTypes from 'prop-types'

const listContainsDocument = (item, itemList) => {
  if (!itemList || !itemList.length || itemList.length === 0) {
    return false
  }
  return itemList.filter(compareTag => compareTag.key === item.key).length > 0
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
    onChange
  } = props

  const tagPicker = useRef()

  const defaultOnResolveItems = useCallback((filteredText, selectedItems) => {
    if (!filteredText) return items

    if (showSelectedItems) {
      return items.filter(item => item.name.includes(filteredText))
    }

    return items.filter(item => {
      const searchMatch = item.name.includes(filteredText)
      const notSelected = selectedItems.findIndex(({ key }) => key === item.key) < 0
      return searchMatch && notSelected
    })
  }, [items, showSelectedItems])

  const defaultOnItemSelected = useCallback((item) => {
    if (canSelectDuplicates) return item
    if (listContainsDocument(item, tagPicker.current.items)) return null

    return item
  }, [items, tagPicker.current, canSelectDuplicates])

  return (
    <>
      <Label>{label}</Label>
      <TagPicker
        selectedItems={value}
        onChange={onChange}
        componentRef={tagPicker}
        onResolveSuggestions={onResolveItems || defaultOnResolveItems}
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
  onChange: PropTypes.func
}
