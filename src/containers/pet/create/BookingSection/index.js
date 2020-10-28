import React, { useEffect } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header , Grid, Button, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import CancelReserve from './CancelReserve'
import PetNotes from './Notes'
import ViewReport from '@containers/client/reservation/daycamp/AddReportCardForm'

import petDetailDuck from '@reducers/pet/detail'
import clientDetailDuck from '@reducers/client/detail'
import petReservationDuck from '@reducers/pet/reservation'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

function BookingSection({ petDetail, ...props }) {
  const history = useHistory()
  const { pet: petId } = useParams()
  const { petReservation : { filters = {} }  = {} } = props

  useEffect(()=> {
    props.getPet(petId)
    props.setFilters({ service_type_what_ever_name: 'T', service__current_upcoming: [ 'current','upcoming' ]  })
    props.getPetReservations()
  }, [])

  const clientId = `${petDetail.item.client}`

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName)
    {
      case 'view_report' : props.setViewReportItem(item,'CREATE')
        break

      case 'view_note' : props.setNoteItem(item,'READ')
        break

      case 'edit_reserve' : props.setReserveItem(item,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'cancel_checkIn' :
        break
      case 'cancel_reserve' : props.setCancelReserveItem(item,'READ')
        break

      default : return
    }
  }

  const _handleFilterBtnClick = (e, { type }) => {
    props.setFilters({ service_type_what_ever_name: type })
    props.getPetReservations()
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Booking</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv32 div-booking-button'>
        <Button
          basic={filters.service_type_what_ever_name !== 'T'} color='teal'
          content='Training' onClick={_handleFilterBtnClick}
          type='T'/>
        <Button
          basic={filters.service_type_what_ever_name !== 'F'} color='teal'
          content='Fitness' onClick={_handleFilterBtnClick}
          type='F'/>
        <Button
          basic={filters.service_type_what_ever_name !== 'D'} color='teal'
          content='Day Camp' onClick={_handleFilterBtnClick}
          type='D'/>
        <Button
          basic={filters.service_type_what_ever_name !== 'B'} color='teal'
          content='Boarding' onClick={_handleFilterBtnClick}
          type='B'/>
        <Button
          basic={filters.service_type_what_ever_name !== 'G'} color='teal'
          content='Grooming' onClick={_handleFilterBtnClick}
          type='G'/>
      </div>
      <div className='mh28'>
        <Table
          duck={petReservationDuck}
          onOptionDropdownChange={_handleOptionDropdownChange}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
      <ViewReport/>
      <CancelReserve/>
      <PetNotes/>
    </Container>
  )
}

BookingSection.propTypes = {  }

BookingSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petReservation: petReservationDuck.selectors.list(state),
      petDetail     : petDetailDuck.selectors.detail(state)
    }), {
      getPetReservations  : petReservationDuck.creators.get,
      setFilters          : petReservationDuck.creators.setFilters,
      setCancelReserveItem: petReservationDetailDuck.creators.setItem,
      setReserveItem      : petReservationDetailDuck.creators.setItem,
      setNoteItem         : petNoteDetailDuck.creators.setItem,
      setViewReportItem   : clientDetailDuck.creators.setItem,
      getPet              : petDetailDuck.creators.get
    })
)(BookingSection)

