import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import EmployeeTitleFormModal from './form/modal'
import { useChangeStatusEffect } from '@hooks/Shared'
import employeeTitleListConfig from '@lib/constants/list-configs/employee/title'

import employeeTitleDuck from '@reducers/employee/title'
import employeeTitleDetailDuck from '@reducers/employee/title/detail'

const EmployeeTitleList = ({ employeeTitle, employeeTitleDetail, ...props }) => {
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
    if(option === 'delete') props.setItem(employeeTitle.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Employee Titles </Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={14} tablet={8}>
            <Button color='teal' content='Add Employee Title' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={employeeTitleListConfig}
          duck={employeeTitleDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <EmployeeTitleFormModal/>
      <ModalDelete duckDetail={employeeTitleDetailDuck}/>

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
