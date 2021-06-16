import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header, Grid, Button } from 'semantic-ui-react'

import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'
import '../styles.scss'

const ShowDetail = ()=>{
  return (
    <>
      <Grid>
        <Grid.Column className='pl28 pt28 pr8' width={8}>
          <Grid>
            <Grid.Column className='pb0' width={16}>
              <Header as='h6' className='section-header' color='teal'>Basics</Header>
            </Grid.Column>
            <Grid.Column className='info-line-height' width={7}>
              <span>First Name</span><br/>
              <span style={{ marginBottom: '20px' }}>Last Name</span><br/>
              <span>Work Email</span><br/>
              <span>Personal Email</span><br/>
              <span>Mobile Phone</span><br/>
              <span>SSN</span><br/>
              <span>Birthday</span>
            </Grid.Column>

            <Grid.Column className='info-line-height' width={9}>
              <span>Garry</span><br/>
              <span>Hayden</span><br/>
              <span>garry@petkennect.com</span><br/>
              <span>garry@hotmail.com</span><br/>
              <span>315-125-4689</span><br/>
              <span>321-25-1245</span><br/>
              <span>05/22/1985</span>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column className='pt28 pr28 pl8' width={8}>
          <Grid>
            <Grid.Column className='pb0' width={16}>
              <Header as='h6' className='section-header' color='teal'>Emergency Contact</Header>
            </Grid.Column>
            <Grid.Column className='info-line-height' width={7}>
              <span>Full Name</span> <br/>
              <span>Relation</span> <br/>
              <span>Phone Number</span> <br/>
            </Grid.Column>

            <Grid.Column className='info-line-height' width={9}>
              <span>Shannon Mayfield</span><br/>
              <span>Friend</span><br/>
              <span>315-264-1928</span><br/>
            </Grid.Column>
          </Grid>

          <Grid className='mb8'>
            <Grid.Column className='pb0' width={7}>
              <Header as='h6' className='section-header mt8' color='teal'>Login Credentials</Header>
            </Grid.Column>
            <Grid.Column className='pb0' width={9}>
              <Button
                color='teal'
                content='Change Password' name='password'/>
            </Grid.Column>
            <Grid.Column className='info-line-height' width={7}>
              <span>User Id</span><br/>
              <span>Pin</span>
            </Grid.Column>

            <Grid.Column className='info-line-height' width={9}>
              <span>garry@petkennect.com</span><br/>
              <span>566952</span>
            </Grid.Column>
          </Grid>

        </Grid.Column>
      </Grid>

      <Grid className='mb0'>
        <Grid.Column className='pl28 pt28 pr8' width={8}>
          <Grid>
            <Grid.Column className='pb0' width={16}>
              <Header as='h6' className='section-header' color='teal'>Home Address</Header>
            </Grid.Column>
            <Grid.Column className='info-line-height' width={7}>
              <span>Address Line 1</span><br/>
              <span>Address Line 2</span> <br/>
              <span>Zip/Postal Code</span><br/>
              <span>City</span> <br/>
              <span>State/Province</span><br/>
            </Grid.Column>

            <Grid.Column className='info-line-height' width={9}>
              <span>65 Road</span><br/>
              <span></span><br/>
              <span>314689</span><br/>
              <span>St. Louis</span><br/>
              <span>M0</span><br/>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column className='pt28 pr28 pl8' width={8}>
          <Grid>
            <Grid.Column className='pb0' width={16}>
              <Header as='h6' className='section-header' color='teal'>Company Information</Header>
            </Grid.Column>
            <Grid.Column className='info-line-height' width={7}>
              <span>Primary Location</span><br/>
              <span>Hire Date</span><br/>
              <span>Status</span><br/>
              <span>Department</span><br/>
              <span>Roles</span><br/>
              <span>Managers</span><br/>
              <span>Annual PTO</span>
            </Grid.Column>

            <Grid.Column className='info-line-height' width={9}>
              <span>Location One</span><br/>
              <span>1/1/2018</span><br/>
              <span>Active</span><br/>
              <span>Management, Training</span><br/>
              <span>Manager, Dog Training</span><br/>
              <span>Shannon Mayfield</span><br/>
              <span>10</span>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </>

  )
}

export default  compose(
  connect(
    state => ({
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }), {
      setItem: personalInformationDetailDuck.creators.setItem
    })
)(ShowDetail)
