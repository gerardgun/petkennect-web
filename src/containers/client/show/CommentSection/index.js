import React from 'react'
import { connect } from 'react-redux'
import { Header, Button, Grid, Divider, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'
import Form from './Form'
import CommentsItem from './CommentsItem'

import Message from '@components/Message'
import clientCommentDuck from '@reducers/client/comment'
import clientCommentDetailDuck from '@reducers/client/comment/detail'
import authDuck from '@reducers/auth'

import './styles.scss'

function CommentsSection({ clientCommentDetail, clientComment, ...props }) {
  const [ openDeleteModal, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getClientComments, clientCommentDetail.status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleEditBtnClick = (item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleDeleteBtnClick = (item) => {
    props.setItem(item)
    _handleOpen()
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(clientCommentDetail.status)

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
        Internal Comments
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32 comment_message'>
        {
          clientComment.items.results && clientComment.items.results.filter(item => item.follow_up).length > 0
            ? (
              <Message
                content={
                  <Grid padded style={{ marginLeft: -16 }}>
                    <Grid.Column className='mb0 pb0' width='16'>
                      <div className='message__title'>You have comments to resolve</div>
                    </Grid.Column>
                    <Grid.Column width='16'>
                      <Grid>
                        <Grid.Column>
                          <div  className='message__subtitle'>Follow up the messages that request it</div>
                        </Grid.Column>
                      </Grid>

                    </Grid.Column>
                  </Grid>

                } type='warning'/>
            ) : ''
        }
      </div>
      <div className='mh40 mv32 flex justify-end'>
        <Button
          basic
          className='ml16'
          color='teal'
          content='New Comment'
          disabled={saving}
          loading={saving}
          onClick={_handleAddBtnClick}
          size='small'/>
      </div>

      <Form/>

      <Segment className='mh40 border-none shadow-0'>
        {clientComment.status === 'GETTING' && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        {clientComment.items.results && clientComment.items.results.map((item)=> (
          <CommentsItem
            enableUpdate={item.employee === props.currentTenant.employee} item={item} key={item.id}
            onDelete={_handleDeleteBtnClick} onUpdate={_handleEditBtnClick}/>
        ))}
      </Segment>

      <ModalDelete
        duckDetail={clientCommentDetailDuck}
        onClose={_handleClose}
        open={openDeleteModal}/>

    </div>
  )
}

CommentsSection.propTypes = {  }

CommentsSection.defaultProps = {  }

export default compose(
  connect(
    ({ auth, ...state }) => ({
      clientCommentDetail: clientCommentDetailDuck.selectors.detail(state),
      clientComment      : clientCommentDuck.selectors.list(state),
      currentTenant      : authDuck.selectors.getCurrentTenant(auth),

      auth
    }), {
      getClientComments: clientCommentDuck.creators.get,
      setItem          : clientCommentDetailDuck.creators.setItem
    })
)(CommentsSection)
