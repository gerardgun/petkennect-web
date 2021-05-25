import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Grid, Icon, Label, Card } from 'semantic-ui-react'

import { useChangeStatusEffect } from '@hooks/Shared'
import NotificationModal from './notification-modal'
import dashboardNotificationDuck from '@reducers/dashboard/notification'
import dashboardNotificationDetailDuck from '@reducers/dashboard/notification/detail'
import '../../dashboard.scss'

const Notification = (props) => {
  const {
    notifications
  } = props

  useEffect(() => {
    props.getDashboardNotifications()
  }, [])

  useChangeStatusEffect(props.notificationDetail.status)

  const  _handleViewAll = () => {
    props.setItem(null, 'READ')
  }

  return (
    <>
      <Card fluid  style={{ height: '400px' }}>
        <Grid className='ph8 mb8'>
          <Grid.Column className='pb4 pt24' width={16}>
            <Icon color='blue' name='bell outline'></Icon>
            <span style={{ fontSize: '12px' }}><b>Notifications/Requests</b></span>
            <Link className='text-font' onClick={_handleViewAll} style={{ 'float': 'right', color: 'blue' }}><Icon name='expand arrows alternate'></Icon></Link>
          </Grid.Column>
        </Grid>
        <Grid className='ml0 mr0 mb8 mt0' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '2px' }}></Grid>

        {
          notifications.items.reduce((result, item, i) => {
            if(i < 6)
              result.push(<Grid className='ph8 mv0' style={{ display: 'flex' }}>
                <Grid.Column className='icon-style pt0' width={2}>
                  {
                    item.type === 'vaccination' && (<Label
                      circular className='label-style'
                      style={{ backgroundColor: '#fc9e19', color: 'white' }}>
                      <Icon  name='plus'></Icon>
                    </Label>)
                  }
                  {
                    item.type === 'request' && (<Label
                      circular className='label-style'
                      style={{ backgroundColor: '#70c74e', color: 'white' }}>
                      <Icon name='comment'></Icon>
                    </Label>)
                  }
                  {
                    item.type === 'cancel' && (<Label
                      circular className='label-style'
                      style={{ backgroundColor: '#c93434', color: 'white' }}>
                      <Icon  name='exclamation'></Icon>
                    </Label>)
                  }
                  {
                    item.type === 'information' && (<Label
                      circular className='label-style'
                      style={{ backgroundColor: '#306EFF', color: 'white' }}>
                      <Icon  name='plus'></Icon>
                    </Label>)
                  }
                </Grid.Column>
                <Grid.Column className='icon-style pt4' width={14}>
                  <Link className='text-font' style={{ color: 'blue' }}>{item.name}</Link>
                  <span className='text-font ml4'>{item.notification}</span>
                </Grid.Column>
              </Grid>)

            return result
          }, [])
        }

      </Card>
      <NotificationModal/>
    </>
  )
}

export default compose(
  connect(
    state => ({
      notifications     : dashboardNotificationDuck.selectors.list(state),
      notificationDetail: dashboardNotificationDetailDuck.selectors.detail(state)
    }), {
      getDashboardNotifications: dashboardNotificationDuck.creators.get,
      setItem                  : dashboardNotificationDetailDuck.creators.setItem
    })
)(Notification)
