import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Segment, Menu, Label, Button, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import dashboardDaycampListConfig from '@lib/constants/list-configs/dashboard/daycamp/daycamp'
import dashboardDaycampCheckedInListConfig from '@lib/constants/list-configs/dashboard/daycamp/daycampCheckedIn'
import dashboardDaycampCheckedOutListConfig from '@lib/constants/list-configs/dashboard/daycamp/daycampCheckedOut'
import dashboardBoardingListConfig from '@lib/constants/list-configs/dashboard/boarding/boarding'
import dashboardBoardingCheckedOutListConfig from '@lib/constants/list-configs/dashboard/boarding/boardingCheckedOut'
import dashboardBoardingCheckedInListConfig from '@lib/constants/list-configs/dashboard/boarding/boardingCheckedIn'
import exampleOneListConfig from '@lib/constants/list-configs/example/one'
import exampleTwoListConfig from '@lib/constants/list-configs/example/two'

import dayCampDashboardDuck from '@reducers/dashboard/daycamp'
import daycampDashboardCheckedInDuck  from '@reducers/dashboard/daycamp/daycampCheckedIn'
import daycampDashboardCheckedOutDuck  from '@reducers/dashboard/daycamp/daycampCheckedOut'
import boardingDashboardDuck from '@reducers/dashboard/boarding'
import boardingDashboardCheckedInDuck  from '@reducers/dashboard/boarding/boardingCheckedIn'
import boardingDashboardCheckedOutDuck  from '@reducers/dashboard/boarding/boardingCheckedOut'
import exampleOneDuck from '@reducers/example/one'
import exampleTwoDuck from '@reducers/example/two'

import './dashboard.scss'

const Dashboard = ({ ...props }) => {
  useEffect(() => {
    props.getdayCampReservation()
    props.getdayCampCheckedInReservation()
    props.getdayCampCheckedOutReservation()
    props.getBoardingReservation()
    props.getBoardingCheckedOutReservation()
    props.getBoardingCheckedInReservation()

    props.getExampleOne()
    props.getExampleTwo()
  }, [])

  const _handleExampleOneRowBtnClick = (button, item) => {
    if(button === 'delete')
      alert(`Delete record with id ${item.id}`)
    else if(button === 'edit')
      alert(`Edit record with id ${item.id}`)
    else if(button === 'show')
      alert(`Show record with id ${item.id}`)
  }

  const _handleExampleTwoRowBtnClick = (button, item) => {
    if(button === 'delete')
      alert(`Delete record with id ${item.id}`)
    else if(button === 'edit')
      alert(`Edit record with id ${item.id}`)
  }

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
                <Table config={dashboardDaycampListConfig} duck={dayCampDashboardDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column className='table-column'>
              <Segment  className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Checked In<Label>{3}</Label></Menu.Item>
                <Table config={dashboardDaycampCheckedInListConfig} duck={daycampDashboardCheckedInDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Checked Out<Label>{2}</Label></Menu.Item>
                <Table config={dashboardDaycampCheckedOutListConfig} duck={daycampDashboardCheckedOutDuck}/>
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
                  <Table config={dashboardBoardingListConfig} duck={boardingDashboardDuck}/>
                </div>
              </Segment>
            </Grid.Column>

            <Grid.Column className='table-column'>
              <Segment  className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>Check Outs<Label>{1}</Label></Menu.Item>
                <Table config={dashboardBoardingCheckedOutListConfig} duck={boardingDashboardCheckedOutDuck}/>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment className='table-segment table-heading-padding'>
                <Menu.Item className='menu-info count-label'>In Boarding<Label>{2}</Label></Menu.Item>
                <Table config={dashboardBoardingCheckedInListConfig} duck={boardingDashboardCheckedInDuck}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <br/>
        <br/>

        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Example One</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={9} tablet={12}>
            <Button color='teal' content='Add Breed'/>
          </Grid.Column>
        </Grid>

        <Table config={exampleOneListConfig} duck={exampleOneDuck} onRowButtonClick={_handleExampleOneRowBtnClick}/>

        <br/>
        <br/>

        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Example Two</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={9} tablet={12}>
            <Button color='teal' content='Add Rating'/>
          </Grid.Column>
        </Grid>

        <Table config={exampleTwoListConfig} duck={exampleTwoDuck} onRowButtonClick={_handleExampleTwoRowBtnClick}/>

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
      getExampleOne                   : exampleOneDuck.creators.get,
      getExampleTwo                   : exampleTwoDuck.creators.get,
      getdayCampReservation           : dayCampDashboardDuck.creators.get,
      getdayCampCheckedInReservation  : daycampDashboardCheckedInDuck.creators.get,
      getdayCampCheckedOutReservation : daycampDashboardCheckedOutDuck.creators.get,
      getBoardingReservation          : boardingDashboardDuck.creators.get,
      getBoardingCheckedOutReservation: boardingDashboardCheckedOutDuck.creators.get,
      getBoardingCheckedInReservation : boardingDashboardCheckedInDuck.creators.get
    }
  )
)(Dashboard)
