import { css } from '@emotion/core'
import { Theme } from '../../utils/Theme'

export const errorBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 0 8px;
  background-color: ${Theme.input.error.hex()};
`

export const inputStyle = css`
  background-color: white;
  border: solid 2px #707070;
  padding: 8px;
  font-size: 15px;
  border-radius: 3px;
  caret-color: #707070;
  color: #353533;
  flex: 1;

  &.error {
    border-right: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &.error {
    border-color: ${Theme.input.error.hex()};
  }

  &::placeholder {
    color: #959595;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px -3px ${Theme.river.hex()};
  }
`

export const labelStyle = css`
  font-size: 15px;

  &.error {
    color: ${Theme.input.error.hex()};
  }
`
