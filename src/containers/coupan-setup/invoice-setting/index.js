/* eslint-disable react/jsx-handler-names */
import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  Grid, Header, Segment } from 'semantic-ui-react'

import loadable from '@loadable/component'
import MenuItem from '../common-section/menu'
import coupanDuck from '@reducers/coupan-setup/coupan'
import coupanDetailDuck from '@reducers/coupan-setup/coupan/detail'
import coupanListConfig from '@lib/constants/list-configs/coupan-setup/coupan-invoice'
import couponUsageDetailDuck from '@reducers/coupan-setup/coupan/coupon-usage/detail'

import '../styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))
const Table = loadable(() => import('@components/Table'))
const CreateCoupanForm = loadable(()=>import('./create-coupan'))
const CouponUsage = loadable(()=>import('./coupan-usage'))

const InvoiceSetting = ()=>{
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      coupanDuck.creators.get()
    )
  }, [])

  const _handleAddBtnClick = ()=>{
    dispatch(coupanDetailDuck.creators.setItem(null,'CREATE'))
  }

  const _handleRowButtonClick = (option,item)=>{
    switch (option) {
      case 'edit': dispatch(coupanDetailDuck.creators.setItem(item,'UPDATE'))
        break
      case 'view_usage': dispatch(couponUsageDetailDuck.creators.setItem(null,'READ'))
        break
    }
  }

  return (
    <>
      <Layout>

        <Segment className='segment-content' padded='very'>
          <MenuItem/>
          <Grid style={{ paddingLeft: '1.1rem' }}>
            <Grid.Row>
              <Header
                as='h4' color='teal'  content='Coupons'
                style={{ marginRight: '10%', marginTop: '.5rem' }}/>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Column className='pt0' column={16}>
              <Table
                config={coupanListConfig} duck={coupanDuck} onActionClick={_handleAddBtnClick}
                onRowButtonClick={_handleRowButtonClick}/>
            </Grid.Column>
          </Grid>
          <CreateCoupanForm/>
          <CouponUsage/>
        </Segment>
      </Layout>
    </>
  )
}

export default InvoiceSetting

