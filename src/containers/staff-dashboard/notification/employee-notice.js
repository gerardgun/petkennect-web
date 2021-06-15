import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header, Grid } from 'semantic-ui-react'
import Table from '@components/Table'
import employeeNoticeConfig from '@lib/constants/list-configs/staff-management/notification/employee-notice'
import employeeNoticeDuck from '@reducers/staff-management/notification/employee-notice'

const EmployeeNotice = ({ ...props }) => {
  useEffect(() => {
    props.getEmployeeNotices()
  }, [])

  return (
    <>
      <div>
        <Grid>
          <Grid.Column width={16}>
            <Header as='h3' color='teal'>Employee Notices</Header>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column className='pt0' width={16}>
            <Table config={employeeNoticeConfig} duck={employeeNoticeDuck}/>
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
        employeeNotice: employeeNoticeDuck.selectors.list(state)
      }
    },
    {
      getEmployeeNotices: employeeNoticeDuck.creators.get
    }
  )
)(EmployeeNotice)

