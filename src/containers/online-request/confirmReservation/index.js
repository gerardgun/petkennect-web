import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'

import { Header , Grid, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'

import ViewNoteSection from '../notesSection/view'

import confirmReservationsDuck from '@reducers/online-request/confirm-reservation'
import petNoteDetailDuck from '@reducers/pet/note/detail'

function ConfirmReservations({ ...props }) {
  useEffect(()=> {
    props.getConfirmReservations()
  }, [])

  const history = useHistory()

  const _handleRowOptionClick = (optionName, item) => {
    if(optionName === 'view')
      props.setNoteItem(item, 'READ')
    else if(optionName === 'review')
      history.push({
        pathname: '/client/64/book',
        state   : {
          redirect_page_name: 'confirm_reservation'
        }
      })
  }

  return (
    <Layout>
      <Segment className='segment-content c-booking' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column
            verticalAlign='middle'>
            <Header as='h2'>Confirm Reservations</Header>
          </Grid.Column>
        </Grid>
        <div className='table-row-padding'>
          <Table
            duck={confirmReservationsDuck}
            onRowOptionClick={_handleRowOptionClick}/>
        </div>
        <ViewNoteSection/>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      confirmReservation: confirmReservationsDuck.selectors.list(state)
    }), {
      getConfirmReservations: confirmReservationsDuck.creators.get,
      setNoteItem           : petNoteDetailDuck.creators.setItem
    })
)(ConfirmReservations)

