import React, { useEffect } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { Header , Grid, Button, Container } from 'semantic-ui-react'
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
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </Container>
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

