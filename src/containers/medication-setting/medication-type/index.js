import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'
import MedicationTypeForm from  './form'
import medicationTypeListConfig from '@lib/constants/list-configs/pet/medication-setting/medication-type'

import medicationTypeDuck from '@reducers/pet/medication-setting/medication-type'
import medicationTypeDetailDuck from '@reducers/pet/medication-setting/medication-type/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const MedicationType = ({  medicationTypeDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getmedicationTypes, medicationTypeDetail.status)

  useEffect(() => {
    props.getmedicationTypes()
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
              config={medicationTypeListConfig}
              duck={medicationTypeDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <MedicationTypeForm/>
      <ModalDelete
        duckDetail={medicationTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medicationType      : medicationTypeDuck.selectors.list(state),
      medicationTypeDetail: medicationTypeDetailDuck.selectors.detail(state)
    }), {
      getmedicationTypes: medicationTypeDuck.creators.get,
      setItem           : medicationTypeDetailDuck.creators.setItem
    })
)(MedicationType)
