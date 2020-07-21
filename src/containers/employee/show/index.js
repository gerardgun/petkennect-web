import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Image, Breadcrumb } from 'semantic-ui-react'
import _defaultTo from 'lodash/defaultTo'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'
import InputReadOnly from '@components/Common/InputReadOnly'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const EmployeeShow = ({ employeeDetail ,...props }) => {
  const { item: employee } = employeeDetail

  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { id } = useParams()
  const history = useHistory()

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
  const _handleDeleteClick = () => {
    _handleOpen()
  }

  const fullname = `${employeeDetail.item.first_name || ''} ${employeeDetail.item.last_name || ''}`

  return (
    <Layout>

      <Segment className='segment-content' padded='very'>
        <Grid>
          <Grid.Column textAlign='left' width={8}>
            <Breadcrumb>
              <Breadcrumb.Section link>
                <Link to='/employee'>Employees</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active link>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column >
          <Grid.Column textAlign='right' width={8}>
            <Button
              as={Link}
              basic
              icon='edit'
              to={`/employee/edit/${employeeDetail.item.id}`}/>
            <Button
              basic
              color='red'
              icon='trash alternate outline' onClick={_handleDeleteClick}/>
          </Grid.Column>

        </Grid>
        <div  className='flex align-center mt36'>
          <Image avatar className='img-40' src={employeeDetail.item.thumbnail_path || defaultImage}/>
          <div className='c-thumbnail'>
            <div className='title'>{fullname}</div>
            <div className='description'>Employee</div>
          </div>
        </div>

        <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
        <Grid columns={3}>
          <InputReadOnly
            label='Email'
            value={_defaultTo(employee.email, '-')}/>
          <InputReadOnly
            label='Name'
            value={_defaultTo(employee.first_name, '-')}/>
          <InputReadOnly
            label='Last Name'
            value={_defaultTo(employee.last_name, '-')}/>

          <InputReadOnly
            label='Profile Picture'
            value={<Image rounded size='mini' src={employeeDetail.item.thumbnail_path || defaultImage}/>}/>
          <InputReadOnly
            label='Title'
            value={_defaultTo(employee.title_name, '-')}/>
          <InputReadOnly
            label='Location'
            value={employee.location ? `${employee.location_code} - ${employee.location_name}` : ''}/>

          <InputReadOnly
            label='Role'
            value={_defaultTo(employee.role_name, '-')}/>
          <InputReadOnly
            label='Status'
            value={employee.status ? 'Active' : 'Inactive'}/>

        </Grid>
      </Segment>

      <ModalDelete
        duckDetail={employeeDetailDuck}
        onClose={_handleClose}
        open={open}/>

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
