import React from 'react'
import { TagItem as OfficeTagITem } from 'office-ui-fabric-react/lib/Pickers'

export const TagItem = props => {
  console.log('test')
  return (
    <OfficeTagITem {...props}>
    </OfficeTagITem>
  )
}
