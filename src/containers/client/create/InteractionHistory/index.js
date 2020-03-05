import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Tab } from 'semantic-ui-react'

import Table from '@components/Table'
import Form from './Form'

import clientDetailDuck from '@reducers/client/detail'
import clientInteractionDuck from '@reducers/client/interaction'
import clientInteractionDetailDuck from '@reducers/client/interaction/detail'

const InteractionHistory = props => {
  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      <Grid className='segment-content-header'>
        <Grid.Column textAlign='right'>
          <Button content='Download' onClick={() => alert('Downloading...')} />
          <Button color='teal' content='Add Comment' onClick={_handleAddBtnClick} />
        </Grid.Column>
      </Grid>
      <Table duck={clientInteractionDuck} />
      <Form />
    </Tab.Pane>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {
      setItem: clientInteractionDetailDuck.creators.setItem,
    }
  ),
)(InteractionHistory)

