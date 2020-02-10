import React, { useEffect, useRef } from 'react'
import { BasePicker } from '../../BasePicker'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'
import { ErrorMessage } from '../ErrorMessage'

export const TagPicker = props => {
  const { ariaLabel, label, styles, path, itemLimit, items, className, onRenderItem, description } = props

  const {
    value,
    error,
    success,
    onChange,
    errClass,
    focus
  } = useFormInput({
    path,
    initialValue: [],
    extractor: (e) => {
      return e
    }
  })

  const ref = useRef()
  useEffect(() => { ref.current.focusInput() }, [focus])

  return <React.Fragment>
    <BasePicker
      className={[className, errClass].join(' ')}
      value={value}
      onChange={onChange}
      items={items}
      ariaLabel={ariaLabel}
      itemLimit={itemLimit}
      label={label}
      onRenderItem={onRenderItem}
      styles={styles}
      description={description}
      componentRef={ref}
    />
    <ErrorMessage error={error} success={success} />
  </React.Fragment>
}

TagPicker.defaultProps = {

}

TagPicker.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  itemLimit: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, name: PropTypes.string })),
  onRenderItem: PropTypes.func,
  description: PropTypes.string,
  styles: PropTypes.object
}
