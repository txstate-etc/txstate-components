import { Maybe } from '../../utils/helper.types'
import { DropdownItemContent } from './Dropdown'

export interface SelectedState {
  selected: Maybe<DropdownItemContent>
  index: Maybe<number>
}

export interface SelectAction {
  payload: SelectedState
}

export const selectedReducer = (state: SelectedState, action: SelectAction) => {
  return {
    ...state,
    ...action.payload
  }
}

export const moveSelection = (selectedState: SelectedState, items: DropdownItemContent[]) => ({
  upOne () {
    let selectedIndex = selectedState.index
    if ((selectedIndex !== null && selectedIndex - 1 < 0) || selectedIndex === null) {
      selectedIndex = items.length - 1
    } else {
      selectedIndex -= 1
    }
    const nextSelection = items[selectedIndex]
    return { payload: { selected: nextSelection, index: selectedIndex } }
  },
  downOne () {
    let selectedIndex = selectedState.index
    if ((selectedIndex !== null && selectedIndex + 1 >= items.length) || selectedIndex === null) {
      selectedIndex = 0
    } else {
      selectedIndex += 1
    }
    const nextSelection = items[selectedIndex]
    return { payload: { selected: nextSelection, index: selectedIndex } }
  }
})

export const moveFocus = (current: number, total: number) => ({
  upOne () {
    if (current - 1 < 0) {
      return total - 1
    }
    return current - 1
  },
  downOne () {
    if (current + 1 >= total) {
      return 0
    }
    return current + 1
  }
})
