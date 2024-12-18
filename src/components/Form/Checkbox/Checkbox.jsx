import React, { useRef, useEffect } from 'react'
import { useFormInput } from '../../../hooks'
import { Checkbox as OfficeCheckbox } from '@fluentui/react/lib/Checkbox'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../ErrorMessage'

export const Checkbox = props => {
  const { path, label, name, ariaLabel, className, styles } = props
  const _id = useRef(shortid.generate())
  const {
    value,
    onChange,
    error,
    success,
    errClass,
    componentRef
  } = useFormInput({
    path,
    extractor: e => e.target.checked
  })

  return (
    <React.Fragment>
      <OfficeCheckbox id={_id.current} label={label} ariaLabel={ariaLabel} name={name} checked={value} onChange={onChange} className={[className, errClass].join(' ')} componentRef={componentRef} styles={styles}/>
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
