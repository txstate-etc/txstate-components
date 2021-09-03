import React from 'react'
import DataTable from 'react-data-table-component'

// TODO: Custom rows
// TODO: Selectable rows
// TODO: Expandable rows
// TODO: Filtering of all columns

export const BaseTable = props => {
  const { initialLoad, columns, paginationPerPage, data, noDataComponent, keyField, onSort, sortServer, sortFunction, title, loading, onChangePage, paginationTotalRows, onChangeRowsPerPage, selectableRows, selectableRowDisabled, clearSelectedRows, onRowSelected, WithSelectedArea } = props

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
      onRowSelected={onRowSelected}
      contextActions={WithSelectedArea}
    />
  )
}
