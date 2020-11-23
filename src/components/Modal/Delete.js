import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import _get from 'lodash/get'

const ModalDelete = ({ detail, duck, duckDetail, list, open, ...props }) => {
  const _handleDeleteBtnClick = () => {
    if(props.onDelete) {
      props.onDelete()
    } else if(isMultipleDeleting) {
      const selectedIds = list.selector.selected_items.map(({ id }) => id)

      props.dispatch(duckDetail.creators.delete(...selectedIds))
        .then(() => {
          props.dispatch(duck.creators.removeSelectedIds())
          props.onClose()
        })
    } else {
      props.dispatch(duckDetail.creators.delete(detail.item.id))
        .then(() => {
          props.onClose()
        })
    }
  }

  const isMultipleDeleting = useMemo(() => Boolean(list), [])
  const deleting = detail.status === 'DELETING'

  return (
    <Modal
      className='ui-delete-modal'
      closeOnDimmerClick={!deleting}
      onClose={props.onClose}
      open={open}>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color='red' name='trash alternate outline'
          size='big' style={{ backgroundColor: 'rgba(221, 75, 57, 0.3)', boxShadow: 'none', fontSize: '2.5rem' }}/>
        <Header as='h2' style={{ fontWeight: 500 }}>
          {
            isMultipleDeleting ? (
              <span>Are you sure to delete the {list.selector.selected_items.length} selected records?</span>
            ) : (
              <span>Are you sure to delete <br/> this record?</span>
            )
          }
        </Header>
        <p style={{ color: 'gray' }}>
          You will not be able to recover them.
        </p>
        {
          detail.status === 'ERROR' && _get(detail, 'error.response.data', null) && (
            <p style={{ color: '#dd4b39' }}>
              {_get(detail, 'error.response.data.detail', null) ? detail.error.response.data.detail[0] : "You can't delete this item."}
            </p>
          )
        }
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic className='w120' content='Cancel'
          disabled={deleting}
          onClick={props.onClose}/>
        <Button
          className='w120'
          color='google plus' content='Delete' icon='trash'
          loading={deleting} onClick={_handleDeleteBtnClick}/>
      </Modal.Actions>
    </Modal>
  )
}

ModalDelete.defaultProps = {
  duck      : null,
  duckDetail: null,
  open      : false,
  onClose   : () => {},
  onDelete  : null
}

export default compose(
  connect(
    (state, { duck, duckDetail }) => ({
      detail: state[duckDetail.store],
      list  : typeof duck !== 'undefined' ? state[duck.store] : null
    }),
    dispatch => ({ dispatch })
  )
)(ModalDelete)
