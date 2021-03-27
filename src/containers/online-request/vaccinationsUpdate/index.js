import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header , Grid, Segment } from 'semantic-ui-react'

import Table from '@components/Table'
import Layout from '@components/Common/Layout'
import ReviewVaccination from './reviewVaccination'

import vaccinationUpdateDuck from '@reducers/online-request/vaccination-update'
import vaccinationUpdateDetailDuck from '@reducers/online-request/vaccination-update/detail'

function VaccinationUpdate({ vaccinationUpdateDetail,...props }) {
  useEffect(()=> {
    props.getVaccinationUpdates()
  }, [])

  useEffect(() => {
    if(vaccinationUpdateDetail.status === 'PATCHED')
      props.getVaccinationUpdates()
  }, [ vaccinationUpdateDetail.status ])

  const _handleRowButtonClick = (option, item) => {
    props.setItem(item, 'READ')
  }

  return (
    <Layout>
      <Segment className='segment-content c-booking' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column
            verticalAlign='middle'>
            <Header as='h2'>New Vaccination Update</Header>
          </Grid.Column>
        </Grid>
        <div className='table-row-padding'>
          <Table
            duck={vaccinationUpdateDuck}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>
        <ReviewVaccination/>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      vaccinationUpdate      : vaccinationUpdateDuck.selectors.list(state),
      vaccinationUpdateDetail: vaccinationUpdateDetailDuck.selectors.detail(state)
    }), {
      getVaccinationUpdates: vaccinationUpdateDuck.creators.get,
      setItem              : vaccinationUpdateDetailDuck.creators.setItem
    })
)(VaccinationUpdate)

