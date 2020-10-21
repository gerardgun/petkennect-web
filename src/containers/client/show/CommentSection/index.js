import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Header, Button, Grid, Loader, Message } from 'semantic-ui-react'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import ClientCommentFormModal from './form/modal'
import useInfiniteScroll from '@hooks/useInfiniteScroll'
import { getAbbreviature } from '@lib/utils/functions'

import clientCommentDuck from '@reducers/client/comment'
import clientCommentDetailDuck from '@reducers/client/comment/detail'
import authDuck from '@reducers/auth'

function CommentSection({ clientComment, ...props }) {
  const [ openDeleteModal, { _handleOpen, _handleClose } ] = useModal()
  useInfiniteScroll('.c-note-item', clientComment, props.getClientComments)
  const { client: clientId } = useParams()
  const [ commentId, setCommentId ] = useState(null)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleFollowUpBtnClick = (e, data) => {
    const item = clientComment.items.find(({ id }) => id === +data['data-item-id'])

    setCommentId(item.id)

    props.put({ client_id: clientId, id: item.id, follow_up: !item.follow_up })
      .then(() => setCommentId(null))
  }

  const _handleEditBtnClick = (e, data) => {
    const item = clientComment.items.find(({ id }) => id === +data['data-item-id'])

    props.setItem(item, 'UPDATE')
  }

  const _handleDeleteBtnClick = (e, data) => {
    const item = clientComment.items.find(({ id }) => id === +data['data-item-id'])

    props.setItem(item, 'DELETE')
    _handleOpen()
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Internal Comments</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button color='teal' content='New Comment' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='petkennect-profile-body-content'>
        {
          clientComment.pending_comments.length > 0 && (
            <Message
              content='Follow up the messages that request it'
              header='You have comments to resolve'
              icon='warning circle'
              warning/>
          )
        }
        {
          clientComment.items.length > 0 ? (
            clientComment.items.map(item => {
              const createdAt = new Date(item.created_at).toLocaleString('en-US')
              const saving = commentId === item.id

              return (
                <div className='c-note-item' key={item.id}>
                  {/* Header */}
                  <div className='flex justify-between align-center mb20'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                        {getAbbreviature(item.employee_full_name)}
                      </div>
                      <div>
                        <p>{item.employee_full_name}</p>
                        <span className='text-gray'>{createdAt}</span>
                      </div>
                    </div>
                    <div>
                      <Button
                        basic color='red' data-item-id={item.id}
                        icon='trash alternate outline' onClick={_handleDeleteBtnClick}/>
                      {
                        item.employee === props.currentTenant.employee.id && (
                          <Button
                            basic data-item-id={item.id} icon='edit outline'
                            onClick={_handleEditBtnClick}/>
                        )
                      }
                    </div>
                  </div>

                  {/* Content */}
                  <p className='description'>
                    {item.comment}
                  </p>

                  {/* Options */}
                  <Button
                    basic color={item.follow_up ? 'orange' : 'gray'} content='Follow up'
                    data-item-id={item.id} disabled={saving}
                    loading={saving} onClick={_handleFollowUpBtnClick}/>
                </div>
              )
            })
          ) : (
            <p style={{ color: '#AAA', textAlign: 'center', width: '100%', marginTop: '1rem' }}>There {'aren\'t'} comments.</p>
          )
        }

        {
          clientComment.status === 'GETTING' && <Loader active inline='centered'/>
        }
      </div>

      <ClientCommentFormModal/>
      <ModalDelete
        duckDetail={clientCommentDetailDuck}
        onClose={_handleClose}
        open={openDeleteModal}/>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => ({
      clientComment: clientCommentDuck.selectors.list(state),
      currentTenant: authDuck.selectors.getCurrentTenant(auth)
    }), {
      getClientComments: clientCommentDuck.creators.get,
      setItem          : clientCommentDetailDuck.creators.setItem,
      put              : clientCommentDetailDuck.creators.put
    })
)(CommentSection)
