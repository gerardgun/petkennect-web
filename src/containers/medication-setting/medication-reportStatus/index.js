import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import ReportStatusForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import reportStatusListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-report-status'

import reportStatusDuck from '@reducers/pet/medication-setting/medication-report-status'
import reportStatusDetailDuck from '@reducers/pet/medication-setting/medication-report-status/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MedicationReportStatus = ({  reportStatusDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getReportStatus, reportStatusDetail.status)

  useEffect(() => {
    props.getReportStatus()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    switch (button) {
      case 'edit': props.setItem(item,'UPDATE')
        break
      case 'delete' : props.setItem(item,'DELETE')
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <Table
            config={reportStatusListConfig}
            duck={reportStatusDuck}
            onRowButtonClick={_handleButtonClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Report Status</Button>
        </Grid.Column>
      </Grid>

      <ReportStatusForm/>
      <ModalDelete
        duckDetail={reportStatusDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      reportStatus      : reportStatusDuck.selectors.list(state),
      reportStatusDetail: reportStatusDetailDuck.selectors.detail(state)
    }), {
      getReportStatus: reportStatusDuck.creators.get,
      setItem        : reportStatusDetailDuck.creators.setItem
    })
)(MedicationReportStatus)
