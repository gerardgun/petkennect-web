
import React,{ useEffect } from 'react'
import { connect } from 'react-redux'

import { Header, Button, Grid, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import dayCampPackageDuck from '@reducers/pet/day-camp-package'
import dayCampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'

import PackageCreateForm from './package-create'

function DaycampServiceSection({  ...props }) {
  useEffect(() => {
    props.getDayCampPackage()
    props.getDayCampReservation()
  }, [])

  const _handleAddPackageBtnClick = () =>{
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = () => {
    // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }
  const _handleOptionDropdownChange = () => {

  }

  return (
    <Container className='c-booking' fluid>

      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={8} mobile={16}>
          <Header as='h2' className='child_header'>Day Camp Packages</Header>
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Button
            color='teal'
            content='Add Package'
            onClick={_handleAddPackageBtnClick}
            style={{ 'float': 'right' }}/>
          <Button
            color='teal'
            content='Reservation Report'
            onClick={_handleAddPackageBtnClick}
            style={{ 'float': 'right' }}/>
        </Grid.Column>

      </Grid>
      <Table
        duck={dayCampPackageDuck} onOptionDropdownChange={_handleOptionDropdownChange}/>
      <br/>
      <br/>
      <Grid className='segment-content-header' columns={1}>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          <Header as='h2' className='child_header'>Reservations</Header>
        </Grid.Column >
      </Grid>
      <Table
        duck={dayCampReservationDuck}
        onOptionDropdownChange={_handleOptionDropdownChange}
        onRowClick={_handleRowClick}
        onRowOptionClick={_handleRowOptionClick}/>
      <PackageCreateForm/>
    </Container>
  )
}

export default compose(
  connect(
    (state) => ({

      dayCampPackage    : dayCampPackageDuck.selectors.list(state),
      daycampReservation: dayCampReservationDuck.selectors.list(state)
    }),{
      getDayCampPackage    : dayCampPackageDuck.creators.get,
      getDayCampReservation: dayCampReservationDuck.creators.get,
      setItem              : petReservationTrainingPackageDetail.creators.setItem,
      setReserveItem       : petReservationDetailDuck.creators.setItem
    })
)(DaycampServiceSection)

