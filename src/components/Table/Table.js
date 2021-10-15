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
  const { initialPageSize, dataSource, columns, onSelectedRowsChange, selectableRows, selectableRowDisabled, title, keyField, WithSelectedArea } = props
  const [initialLoad, setInitialLoad] = useState(true)

  const {
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    paginationPerPage,
    paginationTotalRows,
    fetchingPage,
    fetchData,
    clearSelectedRows,
    data
  } = useTable({
    initialPageSize,
    dataSource
  })

  useEffect(() => {
    const dataAvailable = Array.isArray(data)
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
        noDataComponent={Array.isArray(data) && data.length === 0 && fetchingPage ? <div /> : <div>No Records Found</div>}
        title={title}
        keyField={keyField}
        onSort={onSort}
        selectableRows={selectableRows}
        selectableRowDisabled={selectableRowDisabled}
        clearSelectedRows={clearSelectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        sortServer
        WithSelectedArea={WithSelectedArea && <WithSelectedArea refreshData={fetchData} />}
      />
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    selector: PropTypes.string,
    sortable: PropTypes.bool,
    format: PropTypes.func,
    cell: PropTypes.elementType,
    right: PropTypes.bool,
    center: PropTypes.bool,
    grow: PropTypes.number,
    width: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    ignoreRowClick: PropTypes.bool,
    button: PropTypes.bool,
    allowOverflow: PropTypes.bool,
    wrap: PropTypes.bool,
    hide: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['sm', 'md', 'lg'])])
  })),
  title: PropTypes.string,
  selectableRows: PropTypes.bool,
  selectableRowDisabled: PropTypes.func,
  onSelectedRowsChange: PropTypes.func,
  dataSource: PropTypes.func,
  initialPageSize: PropTypes.number,
  keyField: PropTypes.string,
  WithSelectedArea: PropTypes.func
}
