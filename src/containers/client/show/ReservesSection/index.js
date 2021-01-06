import React, { useEffect, useState } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { Header , Grid, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import CancelReserve from '@containers/pet/create/BookingSection/CancelReserve'
import PetNotes from '@containers/pet/create/BookingSection/Notes'
import ViewReport from '@containers/pet/create/BookingSection/ReportCard'
import Absent from '@containers/pet/create/BookingSection/Absent'
import Training from '@containers/pet/create/BookingSection/Training'
import Daycamp from '@containers/pet/create/BookingSection/DayCamp'

import petDetailDuck from '@reducers/pet/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDuck from '@reducers/pet/reservation'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

function ReservesSection({ ...props }) {
  const { petReservation : { filters = {} }  = {} } = props

  const [ activeServiceItem, setActiveServiceItem ] = useState('T')

  useEffect(()=> {
    props.setFilters({ service_type_what_ever_name: 'T', service__upcoming: true, service__current: true  })
    props.getPetReservations()
  }, [])

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
        // history.replace(`/client/${clientId}/book`)
        break

      case 'absent' : props.setCancelCheckInItem(item,'DELETE')
        break
      case 'cancel_reserve' : props.setCancelReserveItem(item,'READ')
        break

      default : return
    }
  }

  const _handleFilterBtnClick = type => () => {
    setActiveServiceItem(type)
    props.setFilters({ service_type_what_ever_name: type })
    if(type != 'T' && type != 'D')
      props.getPetReservations()
  }

  return (
    <div className='c-booking'>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          className='pl0'
          verticalAlign='middle'>
          <Header as='h2' >Service Hostory</Header>
        </Grid.Column>
      </Grid>
      <div className='mh16 mv32 div-booking-button'>
        <Button
          basic={filters.service_type_what_ever_name !== 'T'} color='teal'
          content='Training' onClick={_handleFilterBtnClick('T')}/>
        <Button
          basic={filters.service_type_what_ever_name !== 'F'} color='teal'
          content='Fitness' onClick={_handleFilterBtnClick('F')}/>
        <Button
          basic={filters.service_type_what_ever_name !== 'D'} color='teal'
          content='Day Camp' onClick={_handleFilterBtnClick('D')}/>
        <Button
          basic={filters.service_type_what_ever_name !== 'B'} color='teal'
          content='Boarding' onClick={_handleFilterBtnClick('B')}/>
        <Button
          basic={filters.service_type_what_ever_name !== 'G'} color='teal'
          content='Grooming' onClick={_handleFilterBtnClick('G')}/>
      </div>
      {activeServiceItem === 'T' && <Training/>}
      {activeServiceItem === 'D' && <Daycamp/>}
      {
        activeServiceItem != 'T' && activeServiceItem != 'D' && (
          <>
            <div className='mh8'>
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
    </div>
  )
}

ReservesSection.propTypes = {  }

ReservesSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petReservation: petReservationDuck.selectors.list(state)
    }), {
      getPetReservations  : petReservationDuck.creators.get,
      setFilters          : petReservationDuck.creators.setFilters,
      setCancelReserveItem: petReservationDetailDuck.creators.setItem,
      setCancelCheckInItem: petReservationDetailDuck.creators.setItem,
      setReserveItem      : petReservationDetailDuck.creators.setItem,
      setNoteItem         : petNoteDetailDuck.creators.setItem,
      setViewReportItem   : petDetailDuck.creators.setItem

    })
)(ReservesSection)

