import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/financial-setting/components/Menu'
import ModalDelete from '@components/Modal/Delete'
// import PetKindFormModal from './create'
import Tab from '@containers/setup/financial-setting/invoice/components/Tab'
import Table from '@components/Table'
import petPrincingPackagesListConfig from '@lib/constants/list-configs/pet/pricing/packages'

import servicePriceDuck from '@reducers/service-price'
import servicePriceDetailDuck from '@reducers/service-price/detail'

const SetupFinancialInvoiceServicesIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(servicePriceDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      servicePriceDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        servicePriceDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        servicePriceDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        servicePriceDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={petPrincingPackagesListConfig}
            duck={servicePriceDuck}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        {/* <PetKindFormModal/> */}
        <ModalDelete duckDetail={servicePriceDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupFinancialInvoiceServicesIndex
