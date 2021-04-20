import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationTimeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import medicationTimeListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-time'

import medicationTimeDuck from '@reducers/pet/medication-setting/medication-time'
import medicationTimeDetailDuck from '@reducers/pet/medication-setting/medication-time/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MedicationTime = ({  medicationTimeDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedicationTimes, medicationTimeDetail.status)

  useEffect(() => {
    props.getMedicationTimes()
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
      <Grid>
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={medicationTimeListConfig}
              duck={medicationTimeDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <MedicationTimeForm/>
      <ModalDelete
        duckDetail={medicationTimeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationTime      : medicationTimeDuck.selectors.list(state),
      medicationTimeDetail: medicationTimeDetailDuck.selectors.detail(state)
    }), {
      getMedicationTimes: medicationTimeDuck.creators.get,
      setItem           : medicationTimeDetailDuck.creators.setItem
    })
)(MedicationTime)
