import React from 'react'
import PropTypes from 'prop-types'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { Label } from 'office-ui-fabric-react/lib/Label'

export const Choicegroup = props => {
  const { label, options, ariaLabel } = props

  return (
    <>
      <Label id='radioElement' htmlFor='choicegroup'>{label}</Label>
      <ChoiceGroup
        id='choicegroup'
        role='radiogroup'
        ariaLabel={ariaLabel}
        ariaLabelledBy='radioElement'
        defaultSelectedKey='A'
        options={options}
        required
      />
    </>
  )
}

Choicegroup.propTypes = {
  ariaLabel: PropTypes.string.isRequired
}
