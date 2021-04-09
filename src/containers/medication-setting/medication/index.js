import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import MedicationForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import medicationListConfig from '@lib/constants/list-configs/pet/medication-setting/medication'

import medicationDuck from '@reducers/pet/medication-setting/medication'
import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const Medication = ({  medicationDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getMedications, medicationDetail.status)

  useEffect(() => {
    props.getMedications()
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
            config={medicationListConfig}
            duck={medicationDuck}
            onRowButtonClick={_handleButtonClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Medication</Button>
        </Grid.Column>
      </Grid>

      <MedicationForm/>
      <ModalDelete
        duckDetail={medicationDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      medication      : medicationDuck.selectors.list(state),
      medicationDetail: medicationDetailDuck.selectors.detail(state)
    }), {
      getMedications: medicationDuck.creators.get,
      setItem       : medicationDetailDuck.creators.setItem
    })
)(Medication)
