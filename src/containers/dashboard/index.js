import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Segment, Menu, Label, Button, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import dayCampDashboardDuck from '@reducers/dashboard/daycamp'
import daycampDashboardCheckedInDuck  from '@reducers/dashboard/daycamp/daycampCheckedIn'
import daycampDashboardCheckedOutDuck  from '@reducers/dashboard/daycamp/daycampCheckedOut'
import boardingDashboardDuck from '@reducers/dashboard/boarding'
import boardingDashboardCheckedInDuck  from '@reducers/dashboard/boarding/boardingCheckedIn'
import boardingDashboardCheckedOutDuck  from '@reducers/dashboard/boarding/boardingCheckedOut'

import './dashboard.scss'

const Dashboard = ({ ...props }) => {
  useEffect(() => {
    props.getdayCampReservation()
    props. getdayCampCheckedInReservation()
    props.getdayCampCheckedOutReservation()
    props.getBoardingReservation()
    props.getBoardingCheckedOutReservation()
    props.getBoardingCheckedInReservation()
  }, [])

  let today = new Date()
  const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

  return (<>
    <Layout>
      <Segment className='segment-content segment-padding'>
        <Grid>
          <Grid.Column
            computer={6} mobile={9} tablet={12}><h3><Icon className='chart bar outline'></Icon>Dashboard : {date}</h3></Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={10} mobile={9} tablet={12}>
            <Button color='teal' content='Filters'/>
          </Grid.Column>
        </Grid>

        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column className='table-column'>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info'>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>DayCamp/Fitness</Grid.Column>
                      <Grid.Column className='count-label heading-align'>Booked Reservations<Label>{4}</Label></Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Menu.Item>
                <Table duck={dayCampDashboardDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column className='table-column'>
              <Segment  className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Checked In<Label>{3}</Label></Menu.Item>
                <Table duck={daycampDashboardCheckedInDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Checked Out<Label>{2}</Label></Menu.Item>
                <Table duck={daycampDashboardCheckedOutDuck}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column className='table-column'>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info'>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>Boarding</Grid.Column>
                      <Grid.Column className='count-label heading-align'>Check Ins<Label>{2}</Label></Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Menu.Item>
                <div style={{ width: '100%', overflow: 'auto' }}>
                  <Table duck={boardingDashboardDuck}/>
                </div>
              </Segment>
            </Grid.Column>

            <Grid.Column className='table-column'>
              <Segment  className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Check Outs<Label>{1}</Label></Menu.Item>
                <Table duck={boardingDashboardCheckedOutDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>In Boarding<Label>{2}</Label></Menu.Item>
                <Table duck={boardingDashboardCheckedInDuck}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  </>

  )
}

export default compose(
  connect(
    (state) => ({
      dayCampDashboard: dayCampDashboardDuck.selectors.list(state)

    }),
    {
      getdayCampReservation           : dayCampDashboardDuck.creators.get,
      getdayCampCheckedInReservation  : daycampDashboardCheckedInDuck.creators.get,
      getdayCampCheckedOutReservation : daycampDashboardCheckedOutDuck.creators.get,
      getBoardingReservation          : boardingDashboardDuck.creators.get,
      getBoardingCheckedOutReservation: boardingDashboardCheckedOutDuck.creators.get,
      getBoardingCheckedInReservation : boardingDashboardCheckedInDuck.creators.get

    }
  )
)(Dashboard)
