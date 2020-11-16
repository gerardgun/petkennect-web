import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'
import ReviewVaccination from './reviewVaccination'

import vaccinationUpdateDuck from '@reducers/online-request/vaccination-update'
import vaccinationUpdateDetailDuck from '@reducers/online-request/vaccination-update/detail'

function VaccinationUpdate({ ...props }) {
  useEffect(()=> {
    props.getVaccinationUpdate()
  }, [])

  const _handleRowClick = () => {
    // wip
  }
  const _handleRowOptionClick = (item) => {
    props.setItem(item,'CREATE')
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>New Vaccination Update</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={vaccinationUpdateDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
      <ReviewVaccination/>
    </Container>
  )
}

export default compose(
  connect(
    (state) => ({
      vaccinationUpdate      : vaccinationUpdateDuck.selectors.list(state),
      vaccinationUpdateDetail: vaccinationUpdateDetailDuck.selectors.detail(state)
    }), {
      getVaccinationUpdate: vaccinationUpdateDuck.creators.get,
      setItem             : vaccinationUpdateDetailDuck.creators.setItem
    })
)(VaccinationUpdate)

