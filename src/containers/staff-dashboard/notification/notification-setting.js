import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Header, Grid, Checkbox } from 'semantic-ui-react'

// import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Table from '@components/Table'
import employeeNoticeDuck from '@reducers/staff-management/notification/employee-notice'
import employeeNotificationConfig from '@lib/constants/list-configs/staff-management/notification/notification-setting/employee-notification'
import managerNotificationConfig from '@lib/constants/list-configs/staff-management/notification/notification-setting/manager-notification'
import employeeNotificationDuck from '@reducers/staff-management/notification/notification-setting/employee-notification'
import managerNotificationDuck from '@reducers/staff-management/notification/notification-setting/manager-notification'

import './styles.scss'

const EmployeeNotice = ({ ...props }) => {
  useEffect(() => {
    props.getEmployeeNotices()
    props.getEmployeeNotifications()
    props.getManagerNotifications()
  }, [])

  const _handleCheckboxChecked = (item, data) => {
    console.log('check')
    console.log(data)
    console.log(item)
  }

  return (
    <>
      <div className='notification-setting-style'>
        <Grid>
          <Grid.Column width={11}><Header as='h3' color='teal'>Notification Settings</Header></Grid.Column>
          <Grid.Column style={{ display: 'flex' }} width={5}>
            <Field
              className={props.hideSidebar ? 'employee-left-checkbox' : 'sidebar-employee-left-checkbox'}
              component={FormField} control={Checkbox}
              name='employee_sms'
              type='checkbox'/>
            <Field
              className={props.hideSidebar ? 'employee-right-checkbox' : 'sidebar-employee-right-checkbox'}
              component={FormField} control={Checkbox}
              name='employee_email'
              type='checkbox'/>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column className='pt0' width={16}>
            <Table config={employeeNotificationConfig} duck={employeeNotificationDuck}/>
          </Grid.Column>
          <Grid.Column width={11}>
          </Grid.Column>
          <Grid.Column style={{ display: 'flex' }} width={5}>
            <Field
              className={props.hideSidebar ? 'manager-left-checkbox' : 'sidebar-manager-left-checkbox'}
              component={FormField} control={Checkbox}
              name='manager_sms'
              type='checkbox'/>
            <Field
              className={props.hideSidebar ? 'manager-right-checkbox' : 'sidebar-manager-right-checkbox'}
              component={FormField} control={Checkbox}
              name='manager_email'
              type='checkbox'/>
          </Grid.Column>
          <Grid.Column width={16}>
            <Table config={managerNotificationConfig} duck={managerNotificationDuck} onRowCheckboxChecked={_handleCheckboxChecked}/>
          </Grid.Column>
        </Grid>
      </div>

    </>
  )
}

export default  compose(
  connect(
    (state) => {
      return {
        employeeNotice      : employeeNoticeDuck.selectors.list(state),
        employeeNotification: employeeNotificationDuck.selectors.list(state),
        managerNotification : managerNotificationDuck.selectors.list(state)
      }
    },
    {
      getEmployeeNotices      : employeeNoticeDuck.creators.get,
      getEmployeeNotifications: employeeNotificationDuck.creators.get,
      getManagerNotifications : managerNotificationDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'notification-setting-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(EmployeeNotice)

