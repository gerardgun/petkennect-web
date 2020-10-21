import React, { useEffect, useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Header, Button , Segment, Dimmer, Loader, Grid, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import NoteItem from './NoteItem'
import Form from './Form'

import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import authDuck from '@reducers/auth'
import { useChangeStatusEffect } from '@hooks/Shared'

function NotesSection(props) {
  const {  petNoteDetail, petNote } = props
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  /** client filter */
  const [ filter, setFilter ] = useState({ type: 'B' })

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

  const _handleFilterBtnClick = (e, { type }) => {
    setFilter({ type })
    props.getNotes()
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(petNoteDetail.status)

  return (
    <Container className='c-notes' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Notes</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv32 div-notes-button'>
        <Button
          basic={filter.type !== 'B'} color='teal'
          content='Behavioral' onClick={_handleFilterBtnClick}
          type='B'/>
        <Button
          basic={filter.type !== 'M'} color='teal'
          content='Medical' onClick={_handleFilterBtnClick}
          type='M'/>
        <Button
          basic={filter.type !== 'G'} color='teal'
          content='General' onClick={_handleFilterBtnClick}
          type='G'/>
        <Button
          basic={filter.type !== 'O'} color='teal'
          content='Owner' onClick={_handleFilterBtnClick}
          type='O'/>
      </div>
      <div className='mh28 mv32 flex justify-end'>
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
      <Segment className='mh28 border-none shadow-0'>
        {petNote.status === 'GETTING' && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        {petNote.items.filter(({ type })=> type === filter.type).map((item)=> (
          <NoteItem
            enableUpdate={item.employee === props.currentTenant.employee} item={item} key={item.id}
            onDelete={_handleDeleteBtnClick} onUpdate={_handleEditBtnClick}/>
        ))}
      </Segment>
      <Form/>
      <ModalDelete
        duckDetail={petNoteDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Container>
  )
}

NotesSection.propTypes = {  }

NotesSection.defaultProps = {  }

export default compose(
  connect(
    ({ auth, ...state }) => ({
      petNoteDetail: petNoteDetailDuck.selectors.detail(state),
      petNote      : petNoteDuck.selectors.list(state),
      currentTenant: authDuck.selectors.getCurrentTenant(auth),

      auth
    }), {
      getNotes: petNoteDuck.creators.get,
      setItem : petNoteDetailDuck.creators.setItem
    })
)(NotesSection)

