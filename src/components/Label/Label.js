import React from 'react'
import { Label as OfficeLabel } from 'office-ui-fabric-react/lib/Label'

export const Label = props => {
  const { children } = props
  return (
    <OfficeLabel>
      {children}
    </OfficeLabel>
  )
}
