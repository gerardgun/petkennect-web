import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Card, Header , Icon, Grid } from 'semantic-ui-react'
import { GiReceiveMoney } from 'react-icons/gi'
import Table from '@components/Table'
import wagesConfig from '@lib/constants/list-configs/staff-management/information/wages'
import wagesDuck from '@reducers/staff-management/information/wages'
import wagesDetailDuck from '@reducers/staff-management/information/wages/detail'

import '../styles.scss'

const WagesCard = ({ ...props }) => {
  useEffect(() => {
    props.getWages()
  }, [])

  return (
    <Card className='staff-information-styles' fluid>
      <div className='heading-style pv12 flex' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Header as='h4' className='mr4 mb0 ml12' style={{ opacity: '0.9' }}>
          My Wages
        </Header>
        <Icon color='teal' size='large'><GiReceiveMoney/></Icon>
      </div>
      <Grid>
        <Grid.Column className='pb0 table-margin table-padding' computer={16}>
          <Table
            config={wagesConfig}
            duck={wagesDuck}/>
        </Grid.Column>
      </Grid>
    </Card>

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
      resetItem: wagesDetailDuck.creators.resetItem
    }
  )
)(WagesCard)
