import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment, Icon, Breadcrumb } from 'semantic-ui-react'
import loadable from '@loadable/component'
import VaccinationTable from './pet-vaccination-type'
import VaccinationReserveSetting from './vaccination-alert-reservation-setting'
import petKindDetailDuck from '@reducers/pet/kind/detail'

const Layout = loadable(() => import('@components/Common/Layout'))
const QuickLinks = loadable(() => import('./quick-link'))

const VaccinationSetting = (props)=>

{
  useEffect(()=>{
    props.resetItem()
  },[])

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2' className='cls-MainHeader'>Vaccination Settings</Header>
            <hr></hr>
            <Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/animal-setting'>Animal Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/animal-setting/vaccination'>Vaccinations</Link>
              </Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>

        <Grid>
          <Grid.Column computer={16}>
            <QuickLinks/>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column  className='mt20'cpmputer={16}>
            <VaccinationTable/>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column computer={16}>
            <VaccinationReserveSetting/>
          </Grid.Column>
        </Grid>

      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    null, {

      resetItem: petKindDetailDuck.creators.resetItem
    })
)(VaccinationSetting)
