import React from 'react'
import DataTable from '../DataTable/DataTable'

// TODO: Custom rows
// TODO: Selectable rows
// TODO: Expandable rows
// TODO: Filtering of all columns

export const BaseTable = props => {
  const { initialLoad, columns, paginationPerPage, data, noDataComponent, keyField, onSort, sortServer, sortFunction, title, loading, onChangePage, paginationTotalRows, onChangeRowsPerPage, selectableRows, selectableRowDisabled, clearSelectedRows, onSelectedRowsChange, WithSelectedArea } = props

  return initialLoad ? null : (
    <DataTable
      progressPending={loading}
      title={title}
      keyField={keyField}
      noDataComponent={noDataComponent}
      columns={columns}
      data={data}
      sortServer={sortServer}
      onSort={onSort}
      sortFunction={sortFunction}
      pagination
      paginationServer
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      selectableRows={selectableRows}
      selectableRowDisabled={selectableRowDisabled}
      clearSelectedRows={clearSelectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      contextActions={WithSelectedArea}
    />
  )
}
