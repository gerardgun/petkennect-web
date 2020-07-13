import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Image, Breadcrumb } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'
import InputReadOnly from '@components/Common/InputReadOnly'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const EmployeeShow = ({ employeeDetail ,...props }) => {
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
              icon='edit'
              size='small'
              to={`/employee/edit/${employeeDetail.item.id}`}/>
            <Button
              color='google plus'
              icon='trash alternate outline' onClick={_handleDeleteClick}
              size='small'/>
            <Button disabled icon='ellipsis vertical' size='small'/>
          </Grid.Column>

        </Grid>
        <div  className='flex align-center mt36'>
          <Image avatar className='img-40' src={employeeDetail.item.thumbnail_path || defaultImage}/>
          <div className='c-thumbnail'>
            <div className='title'>{fullname}</div>
            <div className='description'>Employee</div>
          </div>
        </div>

        <Header as='h6' className='form-section-header mt36' color='blue'>BASIC INFORMATION</Header>
        <div className='flex flex-row align-center mv20'>
          <InputReadOnly
            className='w33'
            label='Email'
            value={employeeDetail.item.email || ''}/>
          <InputReadOnly
            className='w33'
            label='Name'
            value={employeeDetail.item.first_name || ''}/>
          <InputReadOnly
            className='w33'
            label='Last Name'
            value={employeeDetail.item.last_name || ''}/>
        </div>

        <div className='flex flex-row align-center mv20'>
          <InputReadOnly
            className='w33'
            label='Profile Picture'
            value={<Image rounded size='mini' src={employeeDetail.item.thumbnail_path || defaultImage}/>}/>
          <InputReadOnly
            className='w33'
            label='Title'
            value={employeeDetail.item.title_name || ''}/>
          <InputReadOnly
            className='w33'
            label='Location'
            value={employeeDetail.item.location_name || ''}/>

        </div>
        <div className='flex flex-row align-center mv20 justify-start'>
          <InputReadOnly
            className='w33'
            label='Role'
            value={employeeDetail.item.role || ''}/>
          <InputReadOnly
            className='w33'
            label='Status'
            value={employeeDetail.item.status ? 'Active' : 'Inactive'}/>
        </div>

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
