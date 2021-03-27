import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import PriceMasterCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import priceMasterDuck from '@reducers/price-master'
import priceMasterDetailDuck from '@reducers/price-master/detail'

const PriceMaster = ({ priceMasterDetail, ...props }) => {
  useChangeStatusEffect(props.getPriceMaster, priceMasterDetail.status)

  useEffect(() => {
    props.getPriceMaster()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Price Master</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align' computer={8} mobile={9}
            tablet={8}>
            <Button
              color='teal'
              content='New Price'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={priceMasterDuck}/>
        <PriceMasterCreate/>
        <ModalDelete duckDetail={priceMasterDetailDuck}/>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      priceMaster      : priceMasterDuck.selectors.list(state),
      priceMasterDetail: priceMasterDetailDuck .selectors.detail(state)

    }),
    {
      getPriceMaster: priceMasterDuck.creators.get,
      setItem       : priceMasterDetailDuck .creators.setItem
    }
  )
)(PriceMaster)
