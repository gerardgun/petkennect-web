import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Tab } from 'semantic-ui-react'

import Table from '@components/Table'
import Form from './Form'

import clientDetailDuck from '@reducers/client/detail'
import clientCommentDuck from '@reducers/client/comment'
import clientCommentDetailDuck from '@reducers/client/comment/detail'

const InteractionHistory = props => {
  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit') props.setItem(item, 'UPDATE')
  }

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      <Grid className='segment-content-header'>
        <Grid.Column textAlign='right'>
          <Button content='Download' icon='cloud download' labelPosition='left'/>
          <Button color='teal' content='Add Comment' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>
      <Table
        duck={clientCommentDuck}
        onRowClick={_handleRowClick}
        onRowOptionClick={_handleRowOptionClick}/>
      <Form/>
    </Tab.Pane>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {
      setItem: clientCommentDetailDuck.creators.setItem
    }
  )
)(InteractionHistory)
