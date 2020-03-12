import React from 'react'
import { Stack } from '../Stack/Stack'
import { useOptionalId } from '../../hooks/useOptionalId'

interface RadioProps {
  id?: string
}

type Radio = React.FunctionComponent<RadioProps>

export const Radio: Radio = props => {
  const id = useOptionalId(props.id)

  return (
    <Stack>
      <input type='radio' id={id} />
    </Stack>
  )
}
