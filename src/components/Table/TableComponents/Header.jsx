import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { styled } from 'styled-components'
import { Stack } from '../../Stack'
import { SvgLittleArrow, SvgColumnLine } from '../../Svg'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 100 0 auto;
  width: 100px;
  border: none;
`

const Content = styled(Stack)``

const SortIndicator = (props) => {
  const { sortOrder } = props
  const size = useMemo(() => 12, [])
  if (sortOrder === 'asc') {
    return <SvgLittleArrow stroke='#363534' width={size} height={size} style={{ transform: 'rotate(180deg)' }} />
  } else if (sortOrder === 'desc') {
    return <SvgLittleArrow stroke='#363534' width={size} height={size} />
  } else {
    return <SvgColumnLine stroke='#363534' width={size} height={size} />
  }
}

export const Header = React.memo(props => {
  const { toggleSort, className, style, children, sorted, id, ...rest } = props
  const sortOrder = useMemo(() => {
    if (sorted.id && sorted.id === id) {
      return sorted.desc ? 'desc' : 'asc'
    } else {
      return null
    }
  }, [sorted, id])

  return (
    <Container onClick={toggleSort} className='rt-th rt-resizable-header -cursor-pointer' style={{ ...style }} role='columnheader' tabIndex={1}>
      {children[0]}
      <SortIndicator sortOrder={sortOrder} />
      {children[1]}
    </Container>
  )
})

Header.propTypes = {
  sorted: PropTypes.shape({ desc: PropTypes.bool, id: PropTypes.string })
}
