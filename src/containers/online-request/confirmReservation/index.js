import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'

import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'

import ViewNoteSection from '../notesSection/view'

import confirmReservationsDuck from '@reducers/online-request/confirm-reservation'
import petNoteDetailDuck from '@reducers/pet/note/detail'

function ConfirmReservations({ ...props }) {
  useEffect(()=> {
    props.getConfirmReservations()
  }, [])

  const history = useHistory()

  const _handleRowClick = (item) => {
    props.setNoteItem(item, 'READ')
  }
  const _handleRowOptionClick = () => {
    history.replace('/client/64/book')
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Confirm Reservations</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={confirmReservationsDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
      <ViewNoteSection/>
    </Container>
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

