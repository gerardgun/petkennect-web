import React, { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { Card, Header, Button, Icon } from 'semantic-ui-react'
import { useChangeStatusEffect } from '@hooks/Shared'

import Table from '@components/Table'
import dashboardCardListConfig from '@lib/constants/list-configs/dashboard/dashboard-card'
import dashboardCardChildListConfig from '@lib/constants/list-configs/dashboard/dashboard-card-child'
import dashboardCardDuck from '@reducers/dashboard-card'
import dashboardCardModalDetailDuck from '@reducers/dashboard-card/dashboard-card-modal/detail'
import DashboardCardModal from './modal'

import '../dashboard.scss'
const DayCard = (props)=>{
  const [ getAll, setGetAll ] = useState(false)
  const dispatch = useDispatch()

  useChangeStatusEffect(props.dashboardCardDetail.status)

  useEffect(()=>{
    dispatch(dashboardCardDuck.creators.get({ search: 'all' }))
  },[ ])

  const _handleButtonClick = (option,item)=>{
    if(getAll === false)
      dispatch(dashboardCardDuck.creators.get({
        search: item.service
      }))
    else
      dispatch(dashboardCardDuck.creators.get({ search: 'all' }))
    setGetAll(!getAll)
  }

  const _handleOpenModal = () => {
    props.setItem(null,'READ')
  }

  return (
    <>
      <Card fluid>
        <div className='card-header-div'>
          <Header as='h3' className='ml16 mb0' content='05/21/2021'/>
          <div className='flex align-center'>
            <Icon
              color='yellow' name='sun' size='big'/>
            <Header as='h5' className='m0 mr24' color='red'>
            Sunny
              <Header.Subheader>
              precipitation: 50%
              </Header.Subheader>
            </Header>
            <Header as='h5' className='m0' color='blue'>
             31
              <Header.Subheader>
              32/25
              </Header.Subheader>
            </Header>
          </div>
          <div className='expand-div-top'>
            <Button
              basic color='blue' icon='expand arrows alternate'
              onClick={_handleOpenModal}/>
          </div>
        </div>

        <div className='dashboard-card-tb table-button-border'>
          <Table
            childProps={{
              config: dashboardCardChildListConfig
            }}
            config={dashboardCardListConfig} duck={dashboardCardDuck}
            onRowButtonClick={_handleButtonClick}/>
        </div>
        <div className='expand-div-btm'>
          {/* <Icon color='blue' name='expand arrows alternate' size='large'/> */}
        </div>
      </Card>
      <DashboardCardModal/>
    </>
  )
}

export default  compose(
  connect(
    state => ({
      dashboardCardDetail: dashboardCardModalDetailDuck.selectors.detail(state)
    }), {
      setItem: dashboardCardModalDetailDuck.creators.setItem
    })
)(DayCard)
