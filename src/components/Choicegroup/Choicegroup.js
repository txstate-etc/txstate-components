import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

//const Label = styled.label``

export const Choicegroup = props => {
    const { name, label, options, ariaLabel } = props

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
                required={true}
            ></ChoiceGroup>
        </>
    )
}
Choicegroup.propTypes = {
    ariaLabel: PropTypes.string.isRequired
}

