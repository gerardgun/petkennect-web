import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import PackageCreateForm from './package-create'
import TrainingPackageEmailForm from './email-form'
import PetNotes from '../Notes'
import petDetailDuck from '@reducers/pet/detail'
import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

function TrainingServiceSection({ petDetail, ...props }) {
  const history = useHistory()

  const { pet: petId } = useParams()

  useEffect(()=> {
    props.getPet(petId)
    props.getPetReservationTraining({ service_type_what_ever_name: 'T' })
  }, [])

  const clientId = `${petDetail.item.client}`
  const _handleAddPackageBtnClick = () =>{
    props.setItem(null, 'CREATE')
  }

  const _handleAddReservationBtnClick = () => {
    props.setReserveItem({ service_type: 'T' },'UPDATE')
    history.replace(`/client/${petDetail.item.client}/book`)
  }

  // eslint-disable-next-line no-unused-vars
  const _handleOptionClick = option => {
    if(option === 'email')
    {props.setItem(null,'SEND')}
    else if(option === 'reservation') {
      props.setReserveItem({ service_type: 'T' },'UPDATE')
      history.replace(`/client/${petDetail.item.client}/book`)
    }
    else if(option === 'view_performance' || option === 'view_report_card') {
      props.setItem(null,'READ')
    }
  }

  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName) {
      case 'edit_reserve' :  props.setReserveItem(item ,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'edit_note' : props.setNoteItem(item,'READ')
        break
    }
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={4} mobile={10} tablet={4}>
          <Header as='h2' className='child_header'>Packages</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={12} mobile={10} tablet={12}>
          <Button
            color='teal'
            content='New Package'
            onClick={_handleAddPackageBtnClick}/>
        </Grid.Column>
      </Grid>
      <Table
        duck={petTrainingPackageDuck} onOptionDropdownChange={_handleOptionClick}/>

      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={4} mobile={10} tablet={4}>
          <Header as='h2' className='child_header'>Reservations</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={12} mobile={10} tablet={12}>
          <Button
            color='teal'
            content='New Reservation'
            onClick={_handleAddReservationBtnClick}/>
        </Grid.Column>
      </Grid>
      <Table
        duck={petTrainingReservationDuck} onOptionDropdownChange={_handleOptionDropdownChange}/>
      <PackageCreateForm/>
      <TrainingPackageEmailForm/>
      <PetNotes/>
    </Container>
  )
}

export default compose(
  connect(
    (state) => ({

      petReservation       : petTrainingPackageDuck.selectors.list(state),
      petDetail            : petDetailDuck.selectors.detail(state),
      trainingPackageDetail: petReservationTrainingPackageDetail.selectors.detail(state)
    }),{
      setItem                  : petReservationTrainingPackageDetail.creators.setItem,
      setReserveItem           : petReservationDetailDuck.creators.setItem,
      getPet                   : petDetailDuck.creators.get,
      getPetReservationTraining: petTrainingReservationDuck.creators.get,
      setNoteItem              : petNoteDetailDuck.creators.setItem

    })
)(TrainingServiceSection)

