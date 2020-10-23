import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Grid, Header, Segment, Image, Button, Dropdown } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import useModal from '@components/Modal/useModal'
import { defaultImageUrl } from '@lib/constants'
import InformationSection from './InformationSection'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

const EmployeeShow = ({ employeeDetail ,...props }) => {
  const [ { _handleOpen } ] = useModal()
  const { id } = useParams()
  const history = useHistory()
  const { item: employee } = employeeDetail

  useEffect(() => {
    if(employeeDetail.status === 'PATCHED') props.get()
  }, employeeDetail.status)

  useEffect(() => {
    props.getEmployee(id)

    return () => {
      props.resetItem()
    }
  }, [])
  useEffect(()=> {
    if(employeeDetail.status === 'DELETED')
      history.replace('/employee')
  }, [ employeeDetail.status ])
  // eslint-disable-next-line no-unused-vars
  const _handleDeleteClick = () => {
    _handleOpen()
  }

  const fullname = `${employee.first_name || ''} ${employee.last_name || ''}`

  const _handleOptionDropdownChange = () => {
    alert('Work in Progress...')
  }

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar p40'
            computer={5} mobile={16} tablet={5}>
            <div className='flex justify-center align-center mt40'>
              <div className='c-image-profile'>
                <Image circular src={employee.thumbnail_path || defaultImageUrl}/>
              </div>
            </div>
            <div className='flex justify-between align-center mb24'>
              <Header as='h2'>{fullname}</Header>
              <Dropdown
                direction='left'
                icon={null}
                onChange={_handleOptionDropdownChange}
                options={[
                  { key: 1, icon: 'download', value: 'download-profile', text: 'Download Profile' },
                  { key: 2, icon: 'paper plane outline', value: 'send-email', text: 'Send Email' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button basic icon='ellipsis vertical'/>
                )}
                value={null}/>

            </div>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={11}>
            <InformationSection/>
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>

  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      employeeDetail: employeeDetailDuck.selectors.detail(state)
    }), {
      getEmployee: employeeDetailDuck.creators.get,
      setItem    : employeeDetailDuck.creators.setItem,
      resetItem  : employeeDetailDuck.creators.resetItem,
      setFilters : employeeDuck.creators.setFilters
    })
)(EmployeeShow)
