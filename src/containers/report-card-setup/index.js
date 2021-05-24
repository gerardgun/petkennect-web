import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loadable from '@loadable/component'
import { Button, Grid, Header, Segment, Breadcrumb, Icon, Divider } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import './styles.scss'
const DayServiceSetup = loadable(() => import('./day-service-setup'))

const ReportCardSetup = ()=>{
  const [ activeServiceItem, setActiveServiceItem ] = useState('D')

  const _handleFilterBtnClick = (e, { type }) => {
    setActiveServiceItem(type)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2'  className='cls-MainHeader mb20'>Report Card Setup</Header>
            {/* <hr></hr> */}
            <Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>Forms and Templates</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>Report Cards</Link>
              </Breadcrumb.Section>
            </Breadcrumb>

          </Grid.Column>
          <Grid.Column
            mobile={16} >
            <div className='flex'>
              <Button
                className='report-setting-tab'
                color={activeServiceItem === 'D' ? 'teal' : null}
                content='Day Services'
                onClick={_handleFilterBtnClick}
                type='D'/>
              <Button
                className='report-setting-tab'
                color={activeServiceItem === 'B' ? 'teal' : null}
                content='Boarding'
                onClick={_handleFilterBtnClick}
                type='B'/>
              <Button
                className='report-setting-tab'
                color={activeServiceItem === 'T' ? 'teal' : null}
                content='Training'
                onClick={_handleFilterBtnClick}
                type='T'/>
              <Button
                className='report-setting-tab'
                color={activeServiceItem === 'G' ? 'teal' : null}
                content='Grooming'
                onClick={_handleFilterBtnClick}
                type='G'/>

            </div>
            <Divider className='mt28 mb16'/>
          </Grid.Column>

        </Grid>
        {activeServiceItem === 'D' && <DayServiceSetup/>}
      </Segment>

    </Layout>

  )
}

export default ReportCardSetup
