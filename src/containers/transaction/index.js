import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Table from '@components/Table'
import Form from '@containers/transaction/create'

import transactionDuck from '@reducers/transaction'
import transactionDetailDuck from '@reducers/transaction/detail'

const Transaction = props => {
  const {
    // transaction,
    transactionDetail
  } = props

  // For Modal Delete
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getTransactions()
  }, [])

  useEffect(() => {
    if(transactionDetail.status === 'POSTED' || transactionDetail.status === 'PUT' || transactionDetail.status === 'DELETED')
      props.getTransactions()
  }, [ transactionDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    } else if(option === 'edit') {
      props.setItem(item, 'UPDATE')
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Transactions</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button color='teal' content='New Transaction' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={transactionDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

        <Form/>
        <ModalDelete
          duckDetail={transactionDetailDuck}
          onClose={_handleClose}
          open={open}/>

      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ transaction, ...state }) => ({
      transaction,
      transactionDetail: transactionDetailDuck.selectors.detail(state)
    }),
    {
      getTransactions: transactionDuck.creators.get,
      setItem        : transactionDetailDuck.creators.setItem
    }
  )
)(Transaction)
