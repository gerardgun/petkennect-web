import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Card, Header , Icon, Grid, Button } from 'semantic-ui-react'

import Table from '@components/Table'
import availabilityConfig from '@lib/constants/list-configs/staff-management/information/availability'
import availabilityDuck from '@reducers/staff-management/information/availability'
import availabilityDetailDuck from '@reducers/staff-management/information/availability/detail'
import AvailabilityModal from './modal'

import '../styles.scss'

const AvailabilityCard = ({ ...props }) => {
  useEffect(() => {
    props.getAvailabilities()
  }, [])

  const _handleEditAvailability = () => {
    props.setItem(null, 'UPDATE')
  }

  return (
    <Card className='staff-information-styles' fluid>
      <Grid className='heading-style mh0' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Grid.Column className='pb12' width={8}>
          <Header as='h4' className='mb0' style={{ opacity: '0.9', 'float': 'left' }}>
            My Availability <Icon color='teal' name='clock outline' size='large'/>
          </Header>
        </Grid.Column>
        <Grid.Column className='pb8 pt20 pr8' width={8}>
          <Button
            className='w160 mt0 pb8 pt8' color='teal'
            content='Edit Availability' name='availability'
            onClick={_handleEditAvailability} style={{ 'float': 'right' }}/>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column className='pb0 pt0 table-margin table-padding' computer={16}>
          <Table
            config={availabilityConfig}
            duck={availabilityDuck}/>
        </Grid.Column>
      </Grid>
      <AvailabilityModal/>
    </Card>

  )
}

export default compose(
  connect(
    (state) => {
      const availabilityDetail = availabilityDetailDuck.selectors.detail(state)

      return {
        availabilityDetail,
        availability: availabilityDuck.selectors.list(state)
      }
    },
    {
      getAvailabilities: availabilityDuck.creators.get,
      post             : availabilityDetailDuck.creators.post,
      put              : availabilityDetailDuck.creators.put,
      setItem          : availabilityDetailDuck.creators.setItem,
      resetItem        : availabilityDetailDuck.creators.resetItem
    }
  )
)(AvailabilityCard)
