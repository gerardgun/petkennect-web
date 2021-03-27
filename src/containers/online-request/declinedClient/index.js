import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header , Grid, Segment } from 'semantic-ui-react'

import Table from '@components/Table'
import Layout from '@components/Common/Layout'

import ClientSubmissionShow from './../clientSubmission/show'
import ViewNoteSection from './../notesSection/view'

import clientSubmissionDuck from '@reducers/online-request/client-submission'
import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'

function ClientSubmission({ clientSubmissionDetail, ...props }) {
  useEffect(()=> {
    props.getClientSubmissions({
      status: 'R'
    })
  }, [])

  useEffect(() => {
    if(clientSubmissionDetail.status === 'PATCHED')
      props.getClientSubmissions({
        status: 'R'
      })
  }, [ clientSubmissionDetail.status ])

  const _handleRowButtonClick = (optionName, item) => {
    if(optionName === 'view')
      alert('WIP')
    else if(optionName === 'review')
      props.setItem(item, 'READ')
  }

  return (
    <Layout>
      <Segment className='segment-content c-booking' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column
            verticalAlign='middle'>
            <Header as='h2'>Declined Submissions</Header>
          </Grid.Column>
        </Grid>
        <div className='table-row-padding'>
          <Table
            duck={clientSubmissionDuck}
            onRowButtonClick={_handleRowButtonClick}/>
        </div>

        <ClientSubmissionShow/>
        <ViewNoteSection/>

      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      clientSubmission      : clientSubmissionDuck.selectors.list(state),
      clientSubmissionDetail: clientSubmissionDetailDuck.selectors.detail(state)
    }), {
      getClientSubmissions: clientSubmissionDuck.creators.get,
      setItem             : clientSubmissionDetailDuck.creators.setItem
    })
)(ClientSubmission)

