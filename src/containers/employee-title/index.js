import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import Form from './Form'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'

import employeeTitleDuck from '@reducers/employee/title'
import employeeTitleDetailDuck from '@reducers/employee/title/detail'

const EmployeeTitleList = ({ employeeTitle, employeeTitleDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getEmployeeTitles, employeeTitleDetail.status)

  useEffect(() => {
    props.getEmployeeTitles()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(employeeTitle.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Employee Titles </Header>
          </Grid.Column >
          <Grid.Column textAlign='right'>
            <Button color='teal' content='Add Employee Title' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={employeeTitleDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <Form/>
      <ModalDelete
        duckDetail={employeeTitleDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      employeeTitle      : employeeTitleDuck.selectors.list(state),
      employeeTitleDetail: employeeTitleDetailDuck.selectors.detail(state)
    }),
    {
      setItem          : employeeTitleDetailDuck.creators.setItem,
      getEmployeeTitles: employeeTitleDuck.creators.get
    }
  )
)(EmployeeTitleList)
