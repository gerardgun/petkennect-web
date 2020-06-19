import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal } from 'semantic-ui-react'
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

  const isMultipleDeleting = Boolean(list)
  const deleting = detail.status === 'DELETING'

  return (
    <Modal
      closeOnDimmerClick={!deleting}
      onClose={props.onClose}
      open={open}
      size='tiny'>
      <Header content='Alert!'/>
      <Modal.Content>
        <p>
          {
            isMultipleDeleting ? (
              `Are you sure to delete the ${list.selector.selected_items.length} selected records?`
            ) : (
              'Are you sure to delete this record?'
            )
          }
        </p>
        {
          (detail.status === 'ERROR' && _get(detail, 'error.response.data.detail', null)) && (
            <p style={{ color: '#dd4b39' }}>{detail.error.response.data.detail[0]}</p>
          )
        }
      </Modal.Content>
      <Modal.Actions>
        <Button
          className='cls-cancelButton' content='Cancel' disabled={deleting}
          onClick={props.onClose}/>
        <Button
          className='cls-deleteButton'
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
