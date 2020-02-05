import React, { useRef, useEffect } from 'react'
import { useFormInput } from '../../../hooks'
import { Checkbox as OfficeCheckbox } from 'office-ui-fabric-react/lib/Checkbox'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../ErrorMessage'

export const Checkbox = props => {
  const { path, label, name, ariaLabel, className } = props
  const _id = useRef(shortid.generate())
  const {
    value,
    onChange,
    error,
    success,
    errClass
  } = useFormInput({
    path,
    extractor: e => e.target.checked
  })

  return (
    <React.Fragment>
      <OfficeCheckbox id={_id.current} label={label} ariaLabel={ariaLabel} name={name} checked={value} onChange={onChange} className={[className, errClass].join(' ')} />
      <ErrorMessage error={error} success={success} />
    </React.Fragment>
  )
}

Checkbox.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object
}
