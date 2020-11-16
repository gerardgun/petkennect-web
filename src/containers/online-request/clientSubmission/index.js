import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'

import NewClientSubmission from './create'

import clientSubmissionDuck from '@reducers/online-request/client-submission'
import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'

function ClientSubmission({ ...props }) {
  useEffect(()=> {
    props.getClientSubmission()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = (item) => {
    props.setItem(item, 'CREATE')
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>New Client Submission</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={clientSubmissionDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
      <NewClientSubmission/>
    </Container>
  )
}

export default compose(
  connect(
    (state) => ({
      clientSubmission: clientSubmissionDuck.selectors.list(state)
    }), {
      getClientSubmission: clientSubmissionDuck.creators.get,
      setItem            : clientSubmissionDetailDuck.creators.setItem
    })
)(ClientSubmission)

