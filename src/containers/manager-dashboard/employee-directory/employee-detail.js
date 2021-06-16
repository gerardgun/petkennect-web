import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Icon } from 'semantic-ui-react'

import employeeDirectoryDuck from '@reducers/manager-dashboard/employee/employee-directory'
import employeeDirectoryDetailDuck from '@reducers/manager-dashboard/employee/employee-directory/detail'

const EmployeeDetail = (props)=>{
  useEffect(() => {
    props.getEmployeeDirectories()
  }, [])

  const data = props.employeeDirectory.items.filter((_) => _.id === props.employeeId)

  return (
    <>
      <Grid className='m0'>
        <Grid.Column computer={16}>
          <div style={{ display: 'flex' }}>
            <Icon circular name='user' style={{ fontSize: '25px' }}/>
            <span>
              <b>{data[0] && data[0].name}</b><br/>
              {data[0] && data[0].designation}<br/>
              <span>{data[0] && data[0].status}</span>
            </span>
          </div>
        </Grid.Column>
        <Grid.Column  style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }} width={16}>
          <div style={{ width: '100%', textAlign: 'center' }}><b>Contact Information</b></div><br/>
          <Grid>
            <Grid.Column className='pt0' width={4}>
              <span>Phone:</span><br/>
              <span>Email:</span>
            </Grid.Column>
            <Grid.Column className='pt0' width={12}>
              <span>{data[0] && data[0].phone}</span><br/>
              <span>buffy@petkennect.com</span>
            </Grid.Column>
          </Grid>

        </Grid.Column>
        <Grid.Column style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }} width={16}>
          <div style={{ width: '100%', textAlign: 'center' }}><b>Work Information</b></div><br/>
          <Grid>
            <Grid.Column className='pt0' width={6}>
              <span>Anniversary:</span><br/>
              <span>Manager:</span><br/>
              <span>PTO:</span><br/>
              <span>Requests:</span>
            </Grid.Column>
            <Grid.Column className='pt0' width={10}>
              <span>1/1/2018</span><br/>
              <span>Shannon Mayfield</span><br/>
              <span>10 Days</span><br/>
              <span>None</span>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={16}>
          <div style={{ width: '100%', textAlign: 'center' }}><b>Emergency Information</b></div><br/>
          <Grid>
            <Grid.Column className='pt0' width={5}>
              <span>Contact:</span><br/>
              <span>Relation:</span><br/>
              <span>Phone:</span>
            </Grid.Column>
            <Grid.Column className='pt0' width={11}>
              <span>Shannon Mayfield</span><br/>
              <span>Mother</span><br/>
              <span>(315) 123-8967</span>
            </Grid.Column>
          </Grid>
        </Grid.Column>

      </Grid>

    </>
  )
}

export default compose(
  connect(
    (state) => {
      const employeeDirectoryDetail = employeeDirectoryDetailDuck.selectors.detail(state)

      return {
        employeeDirectoryDetail,
        employeeDirectory: employeeDirectoryDuck.selectors.list(state)
      }
    },
    {
      getEmployeeDirectories: employeeDirectoryDuck.creators.get,
      post                  : employeeDirectoryDetailDuck.creators.post,
      put                   : employeeDirectoryDetailDuck.creators.put,
      resetItem             : employeeDirectoryDetailDuck.creators.resetItem
    }
  )
)(EmployeeDetail)

