import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import ReservationTypeFormModal from '@containers/setup/service/reservation/create/form/modal'
import BoardingActivityFormModal from '@containers/setup/service/reservation/boarding-activity/create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/financial-setting/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/financial-setting/invoice/components/Tab'
import Table from '@components/Table'
import petPrincingServicesActivitiesListConfig from '@lib/constants/list-configs/pet/pricing/services-activities'

import serviceVariationDuck from '@reducers/service/variation'
import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const SetupFinancialInvoiceServicesIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)
  const [ serviceType, setServiceType ] = useState(null)

  useEffect(() => {
    dispatch(
      serviceVariationDuck.creators.get({
        service__type: 'B,C',
        type         : 'A,R'
      })
    )

    return () => {
      dispatch(
        serviceVariationDuck.creators.reset()
      )
    }
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        serviceVariationDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create_boarding_activity') {
      setServiceType('B')

      dispatch(
        serviceVariationDetailDuck.creators.setItem(null, 'CREATE')
      )
    } else if(action === 'create_reservation_type') {
      setServiceType('C')

      dispatch(
        serviceVariationDetailDuck.creators.setItem(null, 'CREATE')
      )
    }
  }

  const _handleDelete = () => {
    dispatch(
      serviceVariationDetailDuck.creators.delete(detail.item.id, detail.item.service.id)
    )
      .then(() => {
        dispatch(
          serviceVariationDetailDuck.creators.resetItem()
        )
      })
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete') {
      dispatch(
        serviceVariationDetailDuck.creators.setItem(item, 'DELETE')
      )
    } else if(button === 'edit') {
      if(item.service.type === 'B')
        setServiceType('B')
      else
        setServiceType('C')

      dispatch(
        serviceVariationDetailDuck.creators.setItem(item, 'UPDATE')
      )
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>

        <Menu/>

        <Tab>
          <Table
            config={petPrincingServicesActivitiesListConfig}
            duck={serviceVariationDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <ModalDelete duckDetail={serviceVariationDetailDuck} onDelete={_handleDelete}/>

        {
          serviceType === 'C' && <ReservationTypeFormModal/>
        }
        {
          serviceType === 'B' && <BoardingActivityFormModal/>
        }

      </Segment>
    </Layout>
  )
}

export default SetupFinancialInvoiceServicesIndex
