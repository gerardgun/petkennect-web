import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import employeeTitleDuck from '@reducers/employee/title'
import employeeTitleDetailDuck from '@reducers/employee/title/detail'
import { useChangeStatusEffect } from '@hooks/Shared'
import Layout from '@components/Common/Layout'

const EmployeeTitleList = ({ employeeTitleDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { status } = employeeTitleDetail
  useEffect(() => {
    props.getEmployeeTitles()
  }, [])

  useChangeStatusEffect(props.getEmployeeTitles, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit') {
      props.setItem(item, 'UPDATE')
    } else if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    }
  }

  return (

    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2' className='cls-MainHeader'>Employee Titles </Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Button
              className='cls-cancelButton'
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>

            <Button
              className='cls-saveButton'
              color='teal'
              content='Add Employee Title'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={employeeTitleDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
      employeeTitleDetail: employeeTitleDetailDuck.selectors.detail(state)
    }),
    {
      setItem          : employeeTitleDetailDuck.creators.setItem,
      getEmployeeTitles: employeeTitleDuck.creators.get
    }
  )
)(EmployeeTitleList)
