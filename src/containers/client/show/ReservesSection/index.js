import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { Header , Grid, Button } from 'semantic-ui-react'
import { compose } from 'redux'
import Training from '@containers/pet/create/BookingSection/Training'
import Daycamp from '@containers/pet/create/BookingSection/DayCamp'
import Grooming from '@containers/pet/create/BookingSection/grooming'
import Boarding from '@containers/pet/create/BookingSection/boarding'
import petDetailDuck from '@reducers/pet/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDuck from '@reducers/pet/reservation'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import  './styles.scss'

function ReservesSection({ ...props }) {
  const [ activeServiceItem, setActiveServiceItem ] = useState('D')

  useEffect(()=> {
    props.setFilters({ service_type_what_ever_name: 'T', service__upcoming: true, service__current: true  })
    props.getPetReservations()
  }, [])

  const _handleFilterBtnClick = (e, { type }) => {
    setActiveServiceItem(type)
    props.setFilters({ service_type_what_ever_name: type })
    if(type != 'T' && type != 'D')
      props.getPetReservations()
  }

  return (
    <div className='c-booking'>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          className='pl0 tab-style service-tabs'
          verticalAlign='middle'>
          <Header as='h2' >Service History</Header>
          <div className='div-booking-button flex'>
            <Button
              basic={activeServiceItem !== 'D'} className='m0'
              color='teal' content='Day Services'
              onClick={_handleFilterBtnClick} type='D'/>
            <Button
              basic={activeServiceItem !== 'B'} className='m0'
              color='teal' content='Boarding'
              onClick={_handleFilterBtnClick} type='B'/>
            <Button
              basic={activeServiceItem !== 'T'}
              className='m0' color='teal'
              content='Training' onClick={_handleFilterBtnClick}
              type='T'/>
            <Button
              basic={activeServiceItem !== 'G'} className='m0'
              color='teal' content='Grooming'
              onClick={_handleFilterBtnClick} type='G'/>
          </div>
        </Grid.Column>
      </Grid>

      {activeServiceItem === 'T' && <Training comesFromScreen='from client'/>}
      {activeServiceItem === 'D' && <Daycamp comesFromScreen='from client'/>}
      {activeServiceItem === 'G' && <Grooming comesFromScreen='from client'/>}
      {activeServiceItem === 'B' && <Boarding comesFromScreen='from client'/>}

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

