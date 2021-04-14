import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/medication/components/Tab'
import ModalDelete from '@components/Modal/Delete'
import ReportStatusForm from  './create'
import Table from '@components/Table'
import reportStatusListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-report-status'

import reportStatusDuck from '@reducers/pet/medication-setting/medication-report-status'
import reportStatusDetailDuck from '@reducers/pet/medication-setting/medication-report-status/detail'

const SetupPetMedicationReportStatusIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(reportStatusDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      reportStatusDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        reportStatusDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        reportStatusDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        reportStatusDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        reportStatusDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <p>
          This field shows up on your medication reports and run cards if enabled. You can enable the {'"Charge Applies"'} based on status.
          </p>
          <Table
            config={reportStatusListConfig}
            duck={reportStatusDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <ReportStatusForm/>

        <ModalDelete duckDetail={reportStatusDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationReportStatusIndex
