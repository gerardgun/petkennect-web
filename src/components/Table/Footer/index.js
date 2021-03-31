import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'

import Pagination from '@components/Pagination'

const TableFooter = ({ duck }) => {
  const dispatch = useDispatch()
  const list = useSelector(duck.selectors.list)

  const _handlePaginationChange = (e, { activePage }) => {
    dispatch(
      duck.creators.get({
        page: activePage
      })
    )
  }

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={10}>

          <Pagination
            activePage={list.pagination.params.page}
            from={list.pagination.meta.from}
            onPageChange={_handlePaginationChange}
            to={list.pagination.meta.to}
            total={list.pagination.meta.total_items}
            totalPages={list.pagination.meta.last_page}/>

        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

export default TableFooter
