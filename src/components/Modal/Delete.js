import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalDelete = ({ detail, duck, duckDetail, list, open, ...props }) => {
  const _handleDeleteBtnClick = () => {
    if(props.onDelete) {
      props.onDelete()
    } else {
      const selectedIds = list.selector.selected_items.map(({ id }) => id)

      props.dispatch(duckDetail.creators.delete(...selectedIds))
        .then(() => {
          props.dispatch(duck.creators.removeSelectedIds())
          props.onClose()
        })
    }
  }

  const deleting = detail.status === 'DELETING'

  return (
    <Modal
      closeOnDimmerClick={!deleting}
      open={open}
      onClose={props.onClose}
      size='tiny'
    >
      <Header content='Alert!' />
      <Modal.Content>
        <p>Are you sure to delete the {list.selector.selected_items.length} selected records?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Cancel' disabled={deleting} onClick={props.onClose} />
        <Button color='google plus' content='Delete' icon='trash' loading={deleting} onClick={_handleDeleteBtnClick} />
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
    (state, props) => ({
      detail: state[props.duckDetail.store],
      list  : state[props.duck.store]
    }),
    dispatch => ({ dispatch })
  )
)(ModalDelete)