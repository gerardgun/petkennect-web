import React, { useEffect } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { Header , Divider, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import petReservationDuck from '@reducers/pet/reservation'

function BookingSection(props) {
  const { petReservation : { filters = {} }  = {} } = props

  useEffect(()=> {
    props.setFilters({ service_type_what_ever_name: 'T'  })
    props.getPetReservations()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  const _handleFilterBtnClick = (e, { type }) => {
    props.setFilters({ service_type_what_ever_name: type })
    props.getPetReservations()
  }

  return (
    <div className='c-booking'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Booking
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32 div-booking-button'>
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
      <div className='mh40'>
        <Table
          duck={petReservationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </div>
  )
}

BookingSection.propTypes = {  }

BookingSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petReservation: petReservationDuck.selectors.list(state)
    }), {
      getPetReservations: petReservationDuck.creators.get,
      setFilters        : petReservationDuck.creators.setFilters

    })
)(BookingSection)

