import React, { useEffect } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { Header , Grid, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import petReservationDuck from '@reducers/pet/reservation'

function ReservesSection(props) {
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

  const _handleFilterBtnClick = type => () => {
    props.setFilters({ service_type_what_ever_name: type })
    props.getPetReservations()
  }

  return (
    <div className='c-booking'>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Reserves</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv32 div-booking-button'>
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
      <div className='mh28'>
        <Table
          duck={petReservationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
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
      getPetReservations: petReservationDuck.creators.get,
      setFilters        : petReservationDuck.creators.setFilters

    })
)(ReservesSection)

