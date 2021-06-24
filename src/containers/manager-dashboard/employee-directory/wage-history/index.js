import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation } from 'react-router-dom'
import { Grid, Segment, Card, Button, Header, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import ManagerShortcut from '../../manager-shortcut/manager-shortcut'
import HeaderLink from '../../manager-shortcut/header-link'
import EmployeeMenu from '../employee-menu'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import { useChangeStatusEffect } from '@hooks/Shared'
import wagesConfig from '@lib/constants/list-configs/manager-dashboard/employee/employee-wage-history'
import wagesDuck from '@reducers/manager-dashboard/employee/employee-wage-history'
import wagesDetailDuck from '@reducers/manager-dashboard/employee/employee-wage-history/detail'

import WageHistoryForm from './wage-history-form'

const EmployeeWageHistory = ({ wagesDetail, ...props }) => {
  useChangeStatusEffect(props.getWages, wagesDetail.status)

  useEffect(() => {
    props.getWages()
  }, [])

  const location = useLocation()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)

  const [ sidebarHidden, setSidebarHidden ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  const _handleCreateWage = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleDropdownOptionClick = (option,item) => {
    switch (option) {
      case 'edit_wage':
        props.setItem(item.id, 'UPDATE')
        break
      case 'end_wage':

        break
      case 'delete_wage':
        props.setItem(item.id, 'DELETE')
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
              <div className='pv20 ph16'>
                <Grid style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <Grid.Column
                    className='pb4'
                    computer={16} mobile={16} tablet={6}>
                    <EmployeeMenu/>
                  </Grid.Column >
                </Grid>
                <Grid columns={2}>
                  <Grid.Column computer={8} mobile={14} tablet={8}>
                    <Header as='h3' className='mt4'>Wage Details</Header>
                  </Grid.Column >
                  <Grid.Column
                    className='ui-grid-align'
                    computer={8} mobile={14} tablet={8}>
                    <Button color='teal' onClick={_handleCreateWage}><Icon name='plus'/>Add Wage</Button>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column
                    className='pt0'
                    computer={16} mobile={16} tablet={6}>
                    <Table
                      config={wagesConfig}
                      duck={wagesDuck}
                      onRowDropdownChange={_handleDropdownOptionClick}/>
                  </Grid.Column >
                </Grid>
              </div>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>
      <ModalDelete duckDetail={wagesDetailDuck}/>
      <WageHistoryForm/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => {
      const wagesDetail = wagesDetailDuck.selectors.detail(state)

      return {
        wagesDetail,
        wages: wagesDuck.selectors.list(state)
      }
    },
    {
      getWages : wagesDuck.creators.get,
      post     : wagesDetailDuck.creators.post,
      put      : wagesDetailDuck.creators.put,
      setItem  : wagesDetailDuck.creators.setItem,
      resetItem: wagesDetailDuck.creators.resetItem
    }
  )
)(EmployeeWageHistory)

