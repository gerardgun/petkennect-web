import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Grid, Header, Icon, Modal } from 'semantic-ui-react'
import ModalDelete from '@components/Modal/Delete'
import CalendarEventForm from './index'

import companyProfileCalendarEventDetailDuck from '@reducers/company-profile/calendar/event/detail'

const CalendarEventFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(companyProfileCalendarEventDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      companyProfileCalendarEventDetailDuck.creators.resetItem()
    )
  }

  const editing = Boolean(detail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)
  const open = [ 'CREATE', 'UPDATE', 'DELETE' ].includes(detail.mode)

  const _handleDeleteEvent = () => {
    dispatch(
      companyProfileCalendarEventDetailDuck.creators.setItem(detail.item, 'DELETE')
    )
  }

  const _handleCloseDelete = () => {
    dispatch(companyProfileCalendarEventDetailDuck.creators.set({ mode: 'UPDATE' }))
  }

  const _handleConfirmDelete = () => {
    dispatch(companyProfileCalendarEventDetailDuck.creators.delete(detail.item)).then(() => {
      _handleClose()
    })
  }

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={open}
        size='small'>
        <Modal.Content>
          <Grid className='flex flex-row justify-between mb20' verticalAlign='middle'>

            <Header as='h2' className='m0'>{editing ? 'Update' : 'New'} Event</Header>
            {editing && (
              <Button
                circular className='icon-trash p0' icon
                onClick={_handleDeleteEvent}>
                <Icon color='red' name='trash alternate' size='big'/>
              </Button>
            )}
          </Grid>

          <CalendarEventForm/>

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel'
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={editing ? 'Save changes' : 'Create Event'}
                disabled={saving}
                form='company-profile-calendar-event'
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>
        </Modal.Content>
      </Modal>
      <ModalDelete duckDetail={companyProfileCalendarEventDetailDuck} onClose={_handleCloseDelete} onDelete={_handleConfirmDelete}/>
    </>
  )
}

export default CalendarEventFormModal
