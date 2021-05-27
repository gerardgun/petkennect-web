import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header , Grid, Button, Divider, Container } from 'semantic-ui-react'
import { compose } from 'redux'
import loadable from '@loadable/component'

import petDetailDuck from '@reducers/pet/detail'
import petReservationBoardingDuck from '@reducers/pet/reservation/boarding'
import petReservationGroomingDuck from '@reducers/pet/reservation/grooming'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

import  './styles.scss'
const Training = loadable(() => import('./Training'))
const DayCamp = loadable(() => import('./DayCamp'))
const Grooming = loadable(() => import('./grooming'))
const Boarding = loadable(() => import('./boarding'))

function BookingSection({  ...props }) {
  const [ activeServiceItem, setActiveServiceItem ] = useState('D')
  const { pet: petId } = useParams()
  useEffect(()=> {
    props.getPet(petId)
    props.getPetReservationGrooming({ service_type_what_ever_name: 'G' })
    props.getPetReservationBoarding({ service_type_what_ever_name: 'B' })
    props.getTrainingPackages({ service_type_what_ever_name: 'T' })
  }, [])

  const _handleFilterBtnClick = (e, { type }) => {
    setActiveServiceItem(type)
  }

  return (
    <Container className='c-booking' fluid>
      <Grid>
        <Grid.Column
          className='pb0'
          mobile={16} verticalAlign='middle'>
          <Header as='h2'>Services</Header>
          <Divider/>
          <div className='flex'>
            <Button
              className='tab-header'
              color={activeServiceItem === 'D' ? 'teal' : null}
              content='Day Services'
              onClick={_handleFilterBtnClick}
              type='D'/>
            <Button
              className='tab-header'
              color={activeServiceItem === 'B' ? 'teal' : null}
              content='Boarding'
              onClick={_handleFilterBtnClick}
              type='B'/>
            <Button
              className='tab-header'
              color={activeServiceItem === 'T' ? 'teal' : null}
              content='Training'
              onClick={_handleFilterBtnClick}
              type='T'/>
            <Button
              className='tab-header'
              color={activeServiceItem === 'G' ? 'teal' : null}
              content='Grooming'
              onClick={_handleFilterBtnClick}
              type='G'/>

          </div>
          <Divider className='mb8'/>
        </Grid.Column>
      </Grid>
      <br></br>
      {activeServiceItem === 'T' && <Training/>}
      {activeServiceItem === 'D' && <DayCamp/>}
      {activeServiceItem === 'G' && <Grooming/>}
      {activeServiceItem === 'B' && <Boarding/>}
    </Container>
  )
}

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
