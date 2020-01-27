import React from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { Theme } from '../../Theme'
import styled from 'styled-components'
import { Stack } from '../../Stack'
import { SvgExclamation, SvgCheckmarkIcon } from '../../Svg'
import { Announced } from 'office-ui-fabric-react/lib/Announced'

const ErrorContainer = styled(Stack)`
  border-radius: 3px;
  overflow: hidden;
  background-color: ${({ error }) => error ? Theme.input.errorbg.hex() : Theme.input.successbg.hex()};
  padding-left: 8px;
`

const Square = styled(Stack)`
  width: 40px;
  height: 40px;
  background-color: ${({ error }) => error ? Theme.input.error.hex() : Theme.input.success.hex()};
`

export const ErrorMessage = ({ error, success, ErrorComponent, SuccessComponent }) => {
  if (!error && !success) return null
  if (error && ErrorComponent) return ErrorComponent
  if (success && SuccessComponent) return SuccessComponent
  return (
    <div>
      <Announced aria-live="polite" message={error || undefined} />
      <ErrorContainer horizontal verticalAlign='center' horizontalAlign='space-between' error={error ? 1 : undefined}>
        <Text variant='small' styles={{ root: { color: error ? Theme.input.error : Theme.input.success } }}>{error || success}</Text>
        <Square horizontalAlign='center' verticalAlign='center' error={error ? 1 : undefined}>
          {error
            ? <SvgExclamation color='#FFF' width={16} height={16} />
            : <SvgCheckmarkIcon color='#FFF' width={16} height={16} />
          }
        </Square>
      </ErrorContainer>
    </div>
  )
}
