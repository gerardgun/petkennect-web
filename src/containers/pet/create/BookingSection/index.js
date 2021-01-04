import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header , Grid, Button, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import CancelReserve from './CancelReserve'
import PetNotes from './Notes'
import ViewReport from './ReportCard'
import Absent from './Absent'
import Training from './Training'

import petDetailDuck from '@reducers/pet/detail'
import petReservationDuck from '@reducers/pet/reservation'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

import  './styles.scss'

function BookingSection({ petDetail, ...props }) {
  const history = useHistory()

  const [ activeServiceItem, setActiveServiceItem ] = useState('T')
  const { pet: petId } = useParams()
  const { petReservation : { filters = {} }  = {} } = props

  useEffect(()=> {
    props.getPet(petId)
    props.setFilters({ service_type_what_ever_name: 'T', service__current_upcoming: [ 'current','upcoming' ]  })
    props.getPetReservations()
    props.getTrainingPackages()
    props.getTrainingReservations()
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

      case 'edit_note' : props.setNoteItem(item,'READ')
        break

      case 'edit_reserve' : props.setReserveItem(item,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'absent' : props.setCancelCheckInItem(item,'DELETE')
        break
      case 'cancel_reserve' : props.setCancelReserveItem(item,'READ')
        break

      default : return
    }
  }

  const _handleFilterBtnClick = (e, { type }) => {
    setActiveServiceItem(type)
    props.setFilters({ service_type_what_ever_name: type })
    if(type != 'T')
      props.getPetReservations()
  }

  const _handleBookButtonClick = () =>{
    props.setReserveItem({ service_type: activeServiceItem }, 'UPDATE')
    history.replace(`/client/${clientId}/book`)
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          className='pl0'
          mobile={11} verticalAlign='middle'>
          <Header as='h2'>Services</Header>
        </Grid.Column>
        <Grid.Column mobile={5} textAlign='right'>
          <Button
            color='teal' content='Book!'
            onClick={_handleBookButtonClick}/>
        </Grid.Column>
      </Grid>
      <div className='mh16 mv32 div-booking-button'>
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
      {activeServiceItem === 'T' && <Training/>}
      {
        activeServiceItem != 'T' && (
          <>
            <div className='mh16 ui-table-overflow'>
              <Table
                duck={petReservationDuck}
                onOptionDropdownChange={_handleOptionDropdownChange}
                onRowClick={_handleRowClick}
                onRowOptionClick={_handleRowOptionClick}/>
            </div>
            <ViewReport/>
            <CancelReserve/>
            <PetNotes/>
            <Absent/>
          </>
        )
      }
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
      getPetReservations     : petReservationDuck.creators.get,
      setFilters             : petReservationDuck.creators.setFilters,
      setPackageFilters      : petTrainingReservationDuck.creators.setFilters,
      setCancelReserveItem   : petReservationDetailDuck.creators.setItem,
      setCancelCheckInItem   : petReservationDetailDuck.creators.setItem,
      setReserveItem         : petReservationDetailDuck.creators.setItem,
      setNoteItem            : petNoteDetailDuck.creators.setItem,
      setViewReportItem      : petDetailDuck.creators.setItem,
      getPet                 : petDetailDuck.creators.get,
      getTrainingPackages    : petTrainingPackageDuck.creators.get,
      getTrainingReservations: petTrainingReservationDuck.creators.get
    })
)(BookingSection)

