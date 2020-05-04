import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import Form from './Form'
import useModal from '@components/Modal/useModal'

import clientCommentDuck from '@reducers/client/comment'
import clientCommentDetailDuck from '@reducers/client/comment/detail'

const InteractionHistory = props => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    const { status } =  props.clientCommentDetail
    if(status === 'DELETED' || status  === 'POSTED' || status === 'PUT') props.getComments()
  }, [ props.clientCommentDetail.status ])

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
          <Button
            content='Download'
            disabled
            icon='cloud download'
            labelPosition='left'/>
          {
            props.clientComment.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
          }
          <Button
            color='teal'
            content='Add Comment'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>
      <Table
        duck={clientCommentDuck}
        onRowClick={_handleRowClick}
        onRowOptionClick={_handleRowOptionClick}/>
      <Form/>

      <ModalDelete
        duck={clientCommentDuck}
        duckDetail={clientCommentDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Tab.Pane>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      clientComment      : state['client/comment'],
      clientCommentDetail: clientCommentDetailDuck.selectors.detail(state)
    }),
    {
      setItem    : clientCommentDetailDuck.creators.setItem,
      getComments: clientCommentDuck.creators.get

    }
  )
)(InteractionHistory)
