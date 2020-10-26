import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Image, Header, Checkbox, Modal, Segment, Grid, Radio } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import { parseResponseError } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'

import { daycampFormId } from './first'

function AddReportCard({ item }) {
  return (
    <Segment>
      <Header as='h2' className='report-card-header'>
        <Image circular src={item[0].image_filepath}/>
        <Header.Content>
          <Header as='h6' className='section-header' color='blue'>{item[0].name}</Header>
          <Header.Subheader>Report</Header.Subheader>
        </Header.Content>
      </Header>

      <Grid className='report-card-radio'>
        <Grid.Column  computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>MY PLAYSTYLE</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>MY PERSONALITY</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>MY NAPS</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>MY FAVORITE ACTIVITY</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>MY FRIENDS</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Header as='h6' className='section-header' color='blue'>YOU SHOULD KNOW I</Header>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
          <Radio label='lorem ipsum dolor sit amet'/>
        </Grid.Column >

        <Grid.Column width={16}>
          <Header as='h6' className='section-header' color='blue'>Staff Comments</Header>
          <textarea className='w100' name='staffComments' rows='5'></textarea>
        </Grid.Column>

        <Grid.Column width={16}>
          <Header as='h6' className='section-header' color='blue'>PRESENTED DOG PERFORMANCE IN </Header>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Barking level'
            name={`${item.id}.barkingLevel`}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Listens to Staff'
            name={`${item.id}.listensToStaff`}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Take Social Cues'
            name={`${item.id}.takeSocialCues`}
            type='checkbox'/>
        </Grid.Column>
      </Grid>
    </Segment>

  )
}

const AddReportCardForm = (props) => {
  const {
    clientDetail,
    clientPet,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  useEffect(() => {
    props.getClientPets()
  }, [])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: clientDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientDetail.mode), [
    clientDetail.mode
  ])
  const isUpdating = Boolean(clientDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='add-report-card-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Report Card
          </Header>
          {props.selectedPets && props.selectedPets.map((petId)=> (
            <AddReportCard
              item={clientPet.items.filter(_pet => _pet.id === petId)}
              key={petId}/>
          ))}
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Done'
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    (state) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(daycampFormId)(state, 'pet')

      return {
        clientDetail,
        initialValues: clientDetail.item,
        clientPet    : clientPetDuck.selectors.list(state),
        selectedPets : selectedPets
      }
    },
    {
      getClientPets: clientPetDuck.creators.get,
      resetItem    : clientDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'add-report-card-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AddReportCardForm)
