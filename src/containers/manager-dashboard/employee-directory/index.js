import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Grid,Segment, Card, Form, Input, Dropdown, Header, Button, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import ManagerShortcut from '../manager-shortcut/manager-shortcut'
import HeaderLink from '../manager-shortcut/header-link'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import Table from '@components/Table'
import employeeDirectoryConfig from '@lib/constants/list-configs/manager-dashboard/employee/employee-directory'
import employeeDirectoryDuck from '@reducers/manager-dashboard/employee/employee-directory'
import employeeDirectoryDetailDuck from '@reducers/manager-dashboard/employee/employee-directory/detail'
import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'
import locationDuck from '@reducers/location'
import EmployeeDetail from './employee-detail'
import EmployeeForm from './form/modal'
import './styles.scss'

export const formId = 'employee-directory-form'

const EmployeeDirectory = (props)=>{
  const {
    locations,
    error // redux-form
  } = props

  useEffect(() => {
    props.getEmployeeDirectories()
    props.getLocations()
  }, [])

  const history = useHistory()
  const location = useLocation()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)

  const [ sidebarHidden, setSidebarHidden ] = useState()
  const [ employeeDetail, setEmployeeDetail ] = useState()
  const [ employeeId, setEmployeeId ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  const _handleCreateEmployee = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleFilter = () => {

  }

  const _handleClick = (e, item) => {
    setEmployeeDetail(true)
    setEmployeeId(item.id)
  }

  const _handleDropdownOptionClick = (option,item) => {
    console.log(item)
    console.log(option)
    switch (option) {
      case 'edit':
        props.setItem(item.id, 'UPDATE')
        break
      case 'wages':
        history.push({
          pathname: `/manager-dashboard/employee-directory/${item.id}/wage-history`
        })
        break
      case 'availability':
        history.push({
          pathname: `/manager-dashboard/employee-directory/${item.id}/availability`
        })
        break

      case 'add_note':

        break
      case 'terminate_team_member':

        break
    }
  }

  return (
    <Layout showSidebar={showSideBar} sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column style={{ width: '17%' }}>
            <ManagerShortcut/>
          </Grid.Column>
          <Grid.Column className='pl0' style={{ width: '83%' }}>
            <Card fluid>
              <div className='pv20 ph20'>
                <Grid columns={2}>
                  <Grid.Column computer={5} mobile={14} tablet={8}>
                    <Header as='h3' className='mt4'>Employee Directory</Header>
                  </Grid.Column >
                  <Grid.Column
                    className='ui-grid-align'
                    computer={6} mobile={14} tablet={8}>
                    <Button color='teal' onClick={_handleCreateEmployee}><Icon name='plus'/> Add Employee</Button>
                  </Grid.Column>
                </Grid>
                <Grid className='employee-directory-style'>
                  <Grid.Column className='table-padding pl4' computer={11}>
                    <>
                      <div className='flex justify-between table-filter-padding align-center dsb-table-hd'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}

                        <Form id={formId} style={{ display: 'flex' }} >
                          <Form.Group className='employee-directory-style'>
                            <Field
                              component={FormField}
                              control={Input}
                              icon='search' iconPosition='left' label='Employee Name'
                              onChange=''
                              placeholder='Enter a Name' style={{ width: '160px' }} type='search'/>
                            <Field
                              className={sidebarHidden === true ? 'table-filter-width-sidebar-max' : 'table-filter-width-sidebar-min'}
                              component={FormField}
                              control={Dropdown}
                              fluid
                              label='Location'
                              name='location'
                              options={locations.items.map((_location) => ({
                                key  : _location.id,
                                value: _location.id,
                                text : `${_location.name}`
                              }))}
                              placeholder='Select'
                              selectOnBlur={false}
                              selection/>
                            <Field
                              className={sidebarHidden === true ? 'table-filter-width-sidebar-max' : 'table-filter-width-sidebar-min'}
                              component={FormField}
                              control={Dropdown}
                              fluid
                              label='Department'
                              name='department'
                              options={[
                                { key: 1, value: 'all', text: 'All' },
                                { key: 2, value: 'management', text: 'Management' },
                                { key: 3, value: 'training', text: 'Training' },
                                { key: 4, value: 'grooming', text: 'Grooming' }
                              ]}
                              placeholder='Select'
                              selectOnBlur={false}
                              selection/>
                            <Field
                              className={sidebarHidden === true ? 'table-filter-width-sidebar-max' : 'table-filter-width-sidebar-min'}
                              component={FormField}
                              control={Dropdown}
                              fluid
                              label='Role'
                              name='role'
                              options={[
                                { key: 1, value: 'all', text: 'All' },
                                { key: 2, value: 'manager', text: 'Manager' },
                                { key: 3, value: 'trainer', text: 'Trainer' },
                                { key: 4, value: 'groomer', text: 'Groomer' }
                              ]}
                              placeholder='Select'
                              selectOnBlur={false}
                              selection/>
                          </Form.Group>
                          <Button
                            className='w120 filter-button-style' color='teal' onClick={_handleFilter}>Filter <Icon className='ml8' name='search'/>
                          </Button>
                          {
                            error && (
                              <Form.Group widths='equal'>
                                <Form.Field>
                                  <FormError message={error}/>
                                </Form.Field>
                              </Form.Group>
                            )
                          }
                        </Form>
                      </div>
                      <div>
                        <Table
                          config={employeeDirectoryConfig}
                          duck={employeeDirectoryDuck}
                          onRowClick={_handleClick}
                          onRowDropdownChange={_handleDropdownOptionClick}/>
                      </div>
                    </>
                  </Grid.Column>
                  <Grid.Column className='pl0 pr8 mt4' computer={5}>
                    {
                      employeeDetail === true && (
                        <Card style={{ width: '100%', backgroundColor: '#EEEEEF' }}><EmployeeDetail employeeId={employeeId}/></Card>
                      )
                    }
                  </Grid.Column>
                </Grid>
              </div>
            </Card>

          </Grid.Column>

        </Grid>

      </Segment>
      <EmployeeForm/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => {
      const employeeDirectoryDetail = employeeDirectoryDetailDuck.selectors.detail(state)

      return {
        employeeDirectoryDetail,
        employeeDirectory: employeeDirectoryDuck.selectors.list(state),
        locations        : locationDuck.selectors.list(state)
      }
    },
    {
      getEmployeeDirectories: employeeDirectoryDuck.creators.get,
      getLocations          : locationDuck.creators.get,
      post                  : employeeDirectoryDetailDuck.creators.post,
      put                   : employeeDirectoryDetailDuck.creators.put,
      resetItem             : employeeDirectoryDetailDuck.creators.resetItem,
      setItem               : personalInformationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeDirectory)

