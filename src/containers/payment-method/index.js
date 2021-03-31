
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import PaymentMethodDuck from '@reducers/payment-method'
import PaymentMethodDetailDuck from '@reducers/payment-method/detail'
import FormModal from './create'

const PaymentMethod = (props) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPaymentMethod()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(props.paymentMethod.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Payment Method</Header>
            <span className='mv20'>Select the method of payment that you accept for payment.</span>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align' computer={8} mobile={9}
            tablet={8}>
            <Button
              color='teal'
              content='New Method'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={PaymentMethodDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>
      <ModalDelete
        duckDetail={PaymentMethodDuck}
        onClose={_handleClose}
        open={open}/>
      <FormModal/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      paymentMethod: PaymentMethodDuck.selectors.list(state)

    }),
    {
      getPaymentMethod: PaymentMethodDuck.creators.get,
      setItem         : PaymentMethodDetailDuck.creators.setItem
    }
  )
)(PaymentMethod)
