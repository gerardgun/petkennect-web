import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'

import Table from '@components/Table'
import dashboardNotificationListConfig from '@lib/constants/list-configs/dashboard/notification'
import dashboardNotificationDuck from '@reducers/dashboard/notification'
import dashboardNotificationDetailDuck from '@reducers/dashboard/notification/detail'

const NotificationModal = (props) => {
  const {
    notificationDetail
  } = props

  useEffect(() => {
    props.getDashboardNotifications()
  }, [])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(notificationDetail.mode), [
    notificationDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        <Header as='h2' content='All Notifications'/>
        <Grid>
          <Grid.Column className='pb0 table-margin' computer={16}>
            <Table
              config={dashboardNotificationListConfig}
              duck={dashboardNotificationDuck}/>
          </Grid.Column>
          <Grid.Column className='pt0' computer={16} textAlign='right'>
            <Button content='Cancel' onClick={_handleClose}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const notificationDetail = dashboardNotificationDetailDuck.selectors.detail(state)

      return {
        notificationDetail,
        notification: dashboardNotificationDuck.selectors.list(state)
      }
    },
    {
      getDashboardNotifications: dashboardNotificationDuck.creators.get,
      post                     : dashboardNotificationDetailDuck.creators.post,
      put                      : dashboardNotificationDetailDuck.creators.put,
      resetItem                : dashboardNotificationDetailDuck.creators.resetItem
    }
  )
)(NotificationModal)
