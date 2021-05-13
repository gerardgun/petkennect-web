/* eslint-disable react/jsx-handler-names */
import React, { useEffect, useMemo } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {  Modal ,Grid, Header } from 'semantic-ui-react'
import couponUsageListConfig from '@lib/constants/list-configs/coupan-setup/coupan-usage'
import Table from '@components/Table'
import couponUsageDuck from '@reducers/coupan-setup/coupan/coupon-usage'
import couponUsageDetailDuck from '@reducers/coupan-setup/coupan/coupon-usage/detail'

const CreateCouponForm = ()=>{
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      couponUsageDuck.creators.get()
    )
  }, [])
  const couponUsageDetail = useSelector(couponUsageDetailDuck.selectors.detail)
  const getIsOpened = mode => (mode === 'READ')
  const isOpened = useMemo(() => getIsOpened(couponUsageDetail.mode), [ couponUsageDetail.mode ])

  const _handleClose = () => {
    dispatch(
      couponUsageDetailDuck.creators.resetItem()
    )
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened} >
      <Modal.Content>
        <Header as='h2' content='Coupon Usage'/>
        <Grid>
          <Grid.Column computer={16}>
            <Table config={couponUsageListConfig} duck={couponUsageDuck}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>

  )
}

export default CreateCouponForm

