import React, { useEffect, useState } from 'react'
import { BaseTable } from './BaseTable'
import styled from 'styled-components'
import { useTable } from '../../hooks'
import PropTypes from 'prop-types'

const Overlay = styled.div`
  background-color: #FFFFFF90;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 3rem;
  z-index: 100;
`

const Loading = props => {
  const { switchingPage, initialLoad } = props
  if (initialLoad) return <div>Loading...</div>
  if (switchingPage) return <Overlay>Loading</Overlay>
  return null
}

export const Table = props => {
  const { initialPageSize, dataSource, columns, onRowSelected, selectableRows = false } = props
  const [initialLoad, setInitialLoad] = useState(true)

  const {
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    paginationPerPage,
    paginationTotalRows,
    fetchingPage,
    data
  } = useTable({
    initialPageSize,
    dataSource
  })

  useEffect(() => {
    const dataAvailable = Array.isArray(data) && data.length > 0
    if (initialLoad && dataAvailable && !fetchingPage) {
      setInitialLoad(false)
    }
  }, [data, initialLoad, setInitialLoad, fetchingPage])

  return (
    <div style={{ position: 'relative' }}>
      <Loading initialLoad={initialLoad} switchingPage={fetchingPage} />
      <BaseTable
        initialLoad={initialLoad}
        columns={columns}
        data={data}
        noDataComponent={() => {
          if (Array.isArray(data) && data.length === 0 && fetchingPage) {
            return <div />
          }
          return <div>No Records Found</div>
        }}
        title='People'
        keyField='id.value'
        onSort={onSort}
        selectableRows={selectableRows}
        onRowSelected={onRowSelected}
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        sortServer
      />
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    selector: PropTypes.string,
    sortable: PropTypes.bool,
    format: PropTypes.func,
    cell: PropTypes.elementType,
    right: PropTypes.bool,
    center: PropTypes.bool,
    grow: PropTypes.number,
    ignoreRowClick: PropTypes.bool,
    button: PropTypes.bool,
    allowOverflow: PropTypes.bool,
    hide: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['sm', 'md', 'lg'])])
  })),
  selectableRows: PropTypes.bool,
  onRowSelected: PropTypes.func,
  dataSource: PropTypes.func,
  initialPageSize: PropTypes.number
}
