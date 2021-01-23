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
import DayCamp from './DayCamp'

import petDetailDuck from '@reducers/pet/detail'
import petReservationBoardingDuck from '@reducers/pet/reservation/boarding'
import petReservationGroomingDuck from '@reducers/pet/reservation/grooming'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

import  './styles.scss'

function BookingSection({ petDetail, ...props }) {
  const history = useHistory()

  const [ activeServiceItem, setActiveServiceItem ] = useState('T')
  const { pet: petId } = useParams()

  useEffect(()=> {
    props.getPet(petId)
    props.getPetReservationGrooming({ service_type_what_ever_name: 'G' })
    props.getPetReservationBoarding({ service_type_what_ever_name: 'B' })
    props.getTrainingPackages({ service_type_what_ever_name: 'T' })
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

      case 'absent' : props.setItem(item,'DELETE')
        break
      case 'cancel_reserve' : props.setItem(item,'DISABLE')
        break

      default : return
    }
  }

  const _handleFilterBtnClick = (e, { type }) => {
    setActiveServiceItem(type)
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          className='pl0'
          mobile={16} verticalAlign='middle'>
          <Header as='h2'>Services</Header>
        </Grid.Column>
      </Grid>
      <div className='mh16 mv32 div-booking-button'>
        <Button
          basic={activeServiceItem !== 'T'} color='teal'
          content='Training' onClick={_handleFilterBtnClick}
          type='T'/>
        <Button
          basic={activeServiceItem !== 'F'} color='teal'
          content='Day Services' onClick={_handleFilterBtnClick}
          type='F'/>
        <Button
          basic={activeServiceItem !== 'D'} color='teal'
          content='Day Camp' onClick={_handleFilterBtnClick}
          type='D'/>
        <Button
          basic={activeServiceItem !== 'B'} color='teal'
          content='Boarding' onClick={_handleFilterBtnClick}
          type='B'/>
        <Button
          basic={activeServiceItem !== 'G'} color='teal'
          content='Grooming' onClick={_handleFilterBtnClick}
          type='G'/>
      </div>
      {activeServiceItem === 'T' && <Training/>}
      {activeServiceItem === 'D' && <DayCamp/>}
      {activeServiceItem === 'F' && <DayCamp/>}
      {
        (activeServiceItem === 'G' ||  activeServiceItem === 'B') && (
          <>
            <div className='ui-table-overflow'>
              <Table
                duck={activeServiceItem === 'G' ? petReservationGroomingDuck : petReservationBoardingDuck}
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
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      getPetReservationGrooming: petReservationGroomingDuck.creators.get,
      getPetReservationBoarding: petReservationBoardingDuck.creators.get,
      setPackageFilters        : petTrainingReservationDuck.creators.setFilters,
      setReserveItem           : petReservationDetailDuck.creators.setItem,
      setNoteItem              : petNoteDetailDuck.creators.setItem,
      setViewReportItem        : petDetailDuck.creators.setItem,
      getPet                   : petDetailDuck.creators.get,
      getTrainingPackages      : petTrainingPackageDuck.creators.get,
      getTrainingReservations  : petTrainingReservationDuck.creators.get
    })
)(BookingSection)
