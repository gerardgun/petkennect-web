import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button,Table, Grid, Header,Icon, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import priceMasterDuck from '@reducers/price-master'
import priceMasterDetailDuck from '@reducers/price-master/detail'
import useModal from '@components/Modal/useModal'

import PriceMasterCreate from './create'

const PriceMaster = ({ priceMaster, priceMasterDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPriceMaster, priceMasterDetail.status)

  const [ defaultTableBody, setTableBody ] = useState({ data: [],expandedRows: [] })

  useEffect(() => {
    props.getPriceMaster()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const TableData = priceMaster.items

  const handleRowClick = rowId=> {
    const currentExpandedRows = defaultTableBody.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId)

    setTableBody({ expandedRows: newExpandedRows })
  }

  const renderItemCaret = rowId=> {
    const currentExpandedRows = defaultTableBody.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

    if(isRowCurrentlyExpanded)
      return <Icon name='caret down'/>
    else
      return <Icon name='caret right'/>
  }

  const renderItemDetails = item=> {
    return (
      <>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{item.price}<br/>$23</Table.Cell>
        <Table.Cell>{item.stock}</Table.Cell>
      </>
    )
  }

  const renderItem = (item, index)=> {
    const _handleClickCallback = () => handleRowClick(index)
    const itemRows = [
      <Table.Row key={'row-data-' + index} onClick={_handleClickCallback}>
        <Table.Cell>{renderItemCaret(index)}</Table.Cell>
        <Table.Cell>{item.type}</Table.Cell>
        <Table.Cell>{item.subcategory}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.price}<br/>$23</Table.Cell>
        <Table.Cell>{item.stock}</Table.Cell>
      </Table.Row>
    ]

    if(defaultTableBody.expandedRows.includes(index))
      itemRows.push(
        <Table.Row key={'row-expanded-' + index}>
          {renderItemDetails(item)}
        </Table.Row>
      )

    return itemRows
  }

  let allItemRows = []

  TableData.forEach((item, index) => {
    const perItemRows = renderItem(item, index)
    allItemRows = allItemRows.concat(perItemRows)
  })

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' className='cls-MainHeader'>Price Master</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              className='cls-saveButton' color='teal'
              content='New Price'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell/>
              <Table.HeaderCell>TYPE</Table.HeaderCell>
              <Table.HeaderCell>SUB CATEGORY</Table.HeaderCell>
              <Table.HeaderCell>NAME</Table.HeaderCell>
              <Table.HeaderCell>PRICE</Table.HeaderCell>
              <Table.HeaderCell>STOCK</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{allItemRows}</Table.Body>
        </Table>
        <PriceMasterCreate/>
        <ModalDelete
          duckDetail={priceMasterDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      priceMaster      : priceMasterDuck.selectors.list(state),
      priceMasterDetail: priceMasterDetailDuck.selectors.detail(state)

    }),
    {
      getPriceMaster: priceMasterDuck.creators.get,
      setItem       : priceMasterDetailDuck.creators.setItem
    }
  )
)(PriceMaster)
