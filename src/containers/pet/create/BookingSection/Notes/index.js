import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Container, Grid, Modal } from 'semantic-ui-react'

import { getAbbreviature } from '@lib/utils/functions'

import PetNoteCreate from './create'
import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'

const PetNoteFormModal = ({ petNote, petNoteDetail, ...props }) => {
  const { mode } = petNoteDetail

  useEffect(() => {
    props.getPetNotes({ pet_id: 44, ordering: '-created_at' })
  },[])

  const _handleClose = () => {
    props.resetItem()
  }
  const opened = [ 'READ' ].includes(mode)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={opened}
        size='small'>
        <Modal.Content>
          <Container  className='segment-content' fluid>
            <Grid className='petkennect-profile-body-header'>
              <Grid.Column
                computer={8} mobile={16} tablet={8}
                verticalAlign='middle'>
                <Header as='h2'>Notes</Header>
              </Grid.Column>
              <Grid.Column
                className='ui-grid-align'
                computer={8} mobile={16} tablet={8}>
                <Button
                  basic
                  className='w120'
                  color='teal'
                  content='Cancel'
                  onClick={_handleClose}
                  type='button'/>
                <Button color='teal' content='New Note' onClick={_handleAddBtnClick}/>
              </Grid.Column>
            </Grid>

            <div className='div-notes-button'>
              {
                petNote.items.length > 0 ? (
                  <>
                    <br/>
                    <br/>
                    {
                      petNote.items.length > 0 ? (
                        petNote.items.map(item => {
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
          </Container>
        </Modal.Content>
      </Modal>

      <PetNoteCreate/>
    </>
  )
}

export default compose(
  connect(
    state => ({
      petNote      : petNoteDuck.selectors.list(state),
      petNoteDetail: petNoteDetailDuck.selectors.detail(state)
    }),
    {
      getPetNotes: petNoteDuck.creators.get,
      resetItem  : petNoteDetailDuck.creators.resetItem,
      setItem    : petNoteDetailDuck.creators.setItem
    }
  )
)(PetNoteFormModal)
