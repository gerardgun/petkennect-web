import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { compose } from 'redux'

import useModal from '@components/Modal/useModal'
import { getAbbreviature } from '@lib/utils/functions'

import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import authDuck from '@reducers/auth'

import './styles.scss'

const  ModalDelete = loadable(() => import('@components/Modal/Delete'))
const  PetNoteFormModal = loadable(() => import('./form/modal'))

function NoteSection({ petNote, ...props }) {
  const [ openDeleteModal, { _handleOpen, _handleClose } ] = useModal()

  const [ type, setType ] = useState('B')

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleEditBtnClick = (e, data) => {
    const item = petNote.items.find(({ id }) => id === +data['data-item-id'])

    props.setItem(item, 'UPDATE')
  }

  const _handleDeleteBtnClick = (e, data) => {
    const item = petNote.items.find(({ id }) => id === +data['data-item-id'])

    props.setItem(item, 'DELETE')
    _handleOpen()
  }

  const _handleTypeBtnClick = (e, data) => {
    setType(data['data-type'])
  }

  const filteredNotes = useMemo(() => {
    return petNote.items.filter(item => item.type === type)
  }, [ type, petNote.items ])

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          computer={8} mobile={16} tablet={8}
          verticalAlign='middle'>
          <Header as='h2'>Notes</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={8} mobile={16} tablet={8}>
          <Button color='teal' content='New Note' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='petkennect-profile-body-content div-notes-button'>
        {
          petNote.items.length > 0 ? (
            <>
              <Button
                basic={type !== 'B'} color='teal'
                content='Behavioral' data-type='B'
                onClick={_handleTypeBtnClick}/>
              <Button
                basic={type !== 'M'} color='teal'
                content='Medical' data-type='M'
                onClick={_handleTypeBtnClick}/>
              <Button
                basic={type !== 'G'} color='teal'
                content='General' data-type='G'
                onClick={_handleTypeBtnClick}/>
              <Button
                basic={type !== 'O'} color='teal'
                content='Owner' data-type='O'
                onClick={_handleTypeBtnClick}/>
              <br/>
              <br/>
              {
                filteredNotes.length > 0 ? (
                  filteredNotes.map(item => {
                    const createdAt = new Date(item.created_at).toLocaleString('en-US')

                    return (
                      <div className='c-note-item' key={item.id}>
                        {/* Header */}
                        <div className='flex justify-between align-center mb20'>
                          <div className='avatar-wrapper'>
                            <div className='avatar'>
                              {getAbbreviature(item.employee_fullname)}
                            </div>
                            <div>
                              <p>{item.employee_fullname}</p>
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
                          {item.description}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <p style={{ color: '#AAA', textAlign: 'center', width: '100%', marginTop: '1rem' }}>There {'aren\'t'} notes.</p>
                )
              }
            </>
          ) : (
            <p style={{ color: '#AAA', textAlign: 'center', width: '100%', marginTop: '1rem' }}>There {'aren\'t'} notes for this pet.</p>
          )
        }
      </div>

      <PetNoteFormModal/>
      <ModalDelete
        duckDetail={petNoteDetailDuck}
        onClose={_handleClose}
        open={openDeleteModal}/>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => ({
      petNote      : petNoteDuck.selectors.list(state),
      currentTenant: authDuck.selectors.getCurrentTenant(auth)
    }), {
      getPetNotes: petNoteDuck.creators.get,
      setItem    : petNoteDetailDuck.creators.setItem
    })
)(NoteSection)

