import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid,Segment, Card, Header } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Menu from '../menu'
import Table from '@components/Table'
import AttendanceStatistics from './attendance-statistics'
import noticeConfig from '@lib/constants/list-configs/staff-management/performance/notice'
import reviewConfig from '@lib/constants/list-configs/staff-management/performance/review'
import performanceNotesDuck from '@reducers/staff-management/performance/notice'
import performanceReviewDuck from '@reducers/staff-management/performance/review'
import HeaderLink from '../header-link'
import './styles.scss'

const MyPerformance = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(performanceNotesDuck.creators.get())
    dispatch(performanceReviewDuck.creators.get())
  },[])

  const [ sidebarHidden, setSidebarHidden ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  return (
    <Layout sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column computer={3}>
            <Menu/>
          </Grid.Column>
          <Grid.Column computer={13}>
            <Card fluid>
              <div className='pv12' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                <Header as='h3' className='mb0 ml16' style={{ opacity: '0.9' }}>
                My Performance
                </Header>
              </div>
              <div className='flex'>
                <div className='ph32 pv32' style={{ width: '35%' }}>
                  <Header as='h4' color='teal' content='Attendance Statistics'/>
                  <AttendanceStatistics/>
                </div>
                <div className='ph16 pt32'style={{ width: '65%', borderLeft: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <div>
                    <Header as='h4' color='teal' content='Performance Notices'/>
                    <div className='performance-tb'>
                      <Table config={noticeConfig} duck={performanceNotesDuck}/>
                    </div>

                  </div>
                  <div className='mt32'>
                    <Header as='h4' color='teal' content='Performance Reviews'/>
                    <div className='performance-tb'>
                      <Table config={reviewConfig} duck={performanceReviewDuck}/>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

          </Grid.Column>

        </Grid>

      </Segment>
    </Layout>
  )
}

export default MyPerformance
