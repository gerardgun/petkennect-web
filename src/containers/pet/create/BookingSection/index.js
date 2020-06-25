import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, Button , Divider } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import reservationDuck from '@reducers/reservation'

function BookingSection(props) {
  useEffect(()=> {
    props.getReservations()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Booking
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32'>
        <Button basic color='blue'>
          Training
        </Button>
        <Button basic disabled>
          Fitness
        </Button>
        <Button basic disabled>
          Day Camp
        </Button>
        <Button basic disabled>
          Boarding
        </Button>
        <Button basic disabled>
          Grooming
        </Button>
      </div>
      <Header as='h5'> working in progress ...</Header>
      <div className='mh40'>
        <Table
          duck={reservationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

      </div>
    </div>
  )
}

BookingSection.propTypes = {  }

BookingSection.defaultProps = {  }

export default compose(
  connect(
    () => ({
    }), {
      getReservations: reservationDuck.creators.get
    })
)(BookingSection)

