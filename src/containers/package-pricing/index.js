import React ,{  useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Button, Grid, Header, Segment } from 'semantic-ui-react'
import Table from '@components/Table'
import Layout from '@components/Common/Layout'
import packagePricingDuck from '@reducers/package-pricing'
import packagePricingDetailDuck from '@reducers/package-pricing/detail'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'
import Form from './create'

const PackagePricingList = ({  packagePricing, packagePricingDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPackagePricing, packagePricingDetail.status)
  useEffect(() => {
    props.getPackagePricing()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }
  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(packagePricing.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>

      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Pricing Table</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Pricing'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={packagePricingDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>
      <Form/>
      <ModalDelete
        duckDetail={packagePricingDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      packagePricing      : packagePricingDuck.selectors.list(state),
      packagePricingDetail: packagePricingDetailDuck.selectors.detail(state)
    }),
    {
      setItem          : packagePricingDetailDuck.creators.setItem,
      getPackagePricing: packagePricingDuck.creators.get
    }
  )
)(PackagePricingList)
