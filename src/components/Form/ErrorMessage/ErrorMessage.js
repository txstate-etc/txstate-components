import React from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { Theme } from '../../Theme'
import styled from 'styled-components'
import { Stack } from '../../Stack'
import { SvgExclamation } from '../../Svg'

const ErrorContainer = styled(Stack)`
  border-radius: 3px;
  overflow: hidden;
  background-color: #EBEBEB;
  padding-left: 8px;
`

const Square = styled(Stack)`
  width: 40px;
  height: 40px;
  background-color: ${Theme.input.error.hex()};
`

export const ErrorMessage = ({ error }) => {
  return (
    <ErrorContainer horizontal verticalAlign='center' horizontalAlign='space-between'>
      <Text variant='small' styles={{ root: { color: Theme.input.error } }}>{error}</Text>
      <Square horizontalAlign='center' verticalAlign='center'>
        <SvgExclamation color='#FFF' width={16} height={16} />
      </Square>
    </ErrorContainer>
  )
}
