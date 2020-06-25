import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, Button , Divider } from 'semantic-ui-react'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import NoteItem from './NoteItem'
import Form from './Form'

import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

function NotesSection(props) {
  const {  petNoteDetail, petNote } = props
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useEffect(()=> {
    props.getNotes()
  }, [])
  useChangeStatusEffect(props.getNotes, petNoteDetail.status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleEditBtnClick = (item) => {
    props.setItem(item, 'UPDATE')
  }
  const _handleDeleteBtnClick = (item) => {
    props.setItem(item)
    _handleOpenDeleteModal()
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(petNoteDetail.status)

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Notes
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32'>

        <Button basic color='blue'>
          Behavioral
        </Button>
        <Button basic disabled>
          Medical
        </Button>
        <Button basic disabled>
          General
        </Button>
        <Button basic disabled>
          Owner
        </Button>
        <Header as='h5'> working in progress ...</Header>

      </div>
      <div className='mh40 mv32 flex justify-end'>
        <Button
          className='ml16'
          color='teal'
          content='Add a Note'
          disabled={saving}
          loading={saving}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={_handleAddBtnClick}
          size='small'/>
      </div>
      <div className='mh40'>

        {petNote.items.map((item)=> (
          <NoteItem
            item={item} key={item.id} onDelete={_handleDeleteBtnClick}
            onUpdate={_handleEditBtnClick}/>
        ))}
      </div>
      <Form/>
      <ModalDelete
        duckDetail={petNoteDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </div>
  )
}

NotesSection.propTypes = {  }

NotesSection.defaultProps = {  }

export default compose(
  connect(
    ({ ...state }) => ({
      petNoteDetail: petNoteDetailDuck.selectors.detail(state),
      petNote      : petNoteDuck.selectors.list(state)
    }), {
      getNotes: petNoteDuck.creators.get,
      setItem : petNoteDetailDuck.creators.setItem
    })
)(NotesSection)

