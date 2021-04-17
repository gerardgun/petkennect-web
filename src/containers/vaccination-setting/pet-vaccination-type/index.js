import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetVaccinationTypeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petVaccinationTypeListConfig from '@lib/constants/list-configs/pet/vaccination-type'

import petVaccinationTypeDuck from '@reducers/pet/vaccination-type'
import petVaccinationTypeDetailDuck from '@reducers/pet/vaccination-type/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetVaccinationTypeList = ({  petVaccinationTypeDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetVaccinationType, petVaccinationTypeDetail.status)

  useEffect(() => {
    props.getPetVaccinationType()
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
        <Grid.Column className='ml16' computer={8}>
          <Header as='h4' color='teal'>Vaccination by Species </Header>
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column
          className='ml4'
          computer={10} mobile={15} tablet={8}>
          <Table
            config={petVaccinationTypeListConfig}
            duck={petVaccinationTypeDuck}
            onRowButtonClick={_handleButtonClick}/>
        </Grid.Column>
        <Grid.Column computer={4} mobile={12} tablet={8}>
          <Button
            basic
            color='teal'
            content='Add Vaccination'
            floated='left' icon='Add'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <PetVaccinationTypeForm/>
      <ModalDelete
        duckDetail={petVaccinationTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petVaccinationType      : petVaccinationTypeDuck.selectors.list(state),
      petVaccinationTypeDetail: petVaccinationTypeDetailDuck.selectors.detail(state)
    }), {
      getPetVaccinationType: petVaccinationTypeDuck.creators.get,
      setItem              : petVaccinationTypeDetailDuck.creators.setItem
    }),
  reduxForm({
    form              : 'pet-vaccination-list',
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(PetVaccinationTypeList)
