import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Form, Header, Grid } from 'semantic-ui-react'
import moment from 'moment'
import  _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import { Referred } from '@lib/constants/client'

import clientDetailDuck from '@reducers/client/detail'

function ClienInformationShow({ clientDetail, ...props }) {
  const { item: client } = clientDetail

  const _handleEditBtnClick = () => {
    props.setClient(client, 'UPDATE')
  }

  const peopleToPickup = Array.isArray(client.authorized_people_pick_up) ? client.authorized_people_pick_up : []

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Client Info</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button
            basic icon='edit outline' onClick={_handleEditBtnClick}/>
        </Grid.Column>
      </Grid>
      <Form className='petkennect-profile-body-content'>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths={2}>
          <Form.Input label='Email' readOnly value={_defaultTo(client.email, '-')}/>
          <Form.Input label='First Name' readOnly value={_defaultTo(client.first_name, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Last Name' readOnly value={_defaultTo(client.last_name, '-')}/>
          <Form.Input label='Contact Date' readOnly value={(client.contact_date && moment(client.contact_date).format('MM/DD/YYYY')) || '-'}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Location' readOnly value={client.location ? `${client.location_name} - ${client.location_code}` : '-'}/>
          <Form.Input label='Active' readOnly value={client.is_active ? 'Yes' : 'No'}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Contact Details</Header>
        <Form.Group widths={2}>
          <Form.Input label='Cell Phone' readOnly value={_get(client, 'phones[0]', '-')}/>
          <Form.Input label='Home Phone' readOnly value={_get(client, 'phones[1]', '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Work Phone' readOnly value={_get(client, 'phones[2]', '-')}/>
          <Form.Input label='Other Phone' readOnly value={_get(client, 'phones[3]', '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Alt Email' readOnly value={_defaultTo(client.alt_email, '-')}/>
          <Form.Input label='Referred' readOnly value={_get(Referred, client.referred, '-')}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Client Address</Header>
        <Form.Group widths='equal'>
          <Form.Input label='First Address' readOnly value={_get(client, 'addresses[0]', '-')}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Second Address' readOnly value={_get(client, 'addresses[1]', '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Zip' readOnly value={_defaultTo(client.zip_code, '-')}/>
          <Form.Input label='Country' readOnly value={_defaultTo(client.country_code, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='State' readOnly value={_defaultTo(client.state, '-')}/>
          <Form.Input label='City' readOnly value={_defaultTo(client.city, '-')}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Emergency Contact</Header>
        <Form.Group widths={2}>
          <Form.Input label='Name' readOnly value={_defaultTo(client.emergency_contact_name, '-')}/>
          <Form.Input label='Relation' readOnly value={_defaultTo(client.emergency_contact_relationship, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Phone' readOnly value={_get(client, 'emergency_contact_phones[0]', '-')}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Veterinarian Contact</Header>
        <Form.Group widths={2}>
          <Form.Input label='Vet Name' readOnly value={_defaultTo(client.emergency_vet_name, '-')}/>
          <Form.Input label='Vet Location' readOnly value={_defaultTo(client.emergency_vet_location, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Vet Phone' readOnly value={_get(client, 'emergency_vet_phones[0]', '-')}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>People Authorized to Pick Up</Header>
        {
          peopleToPickup.length > 0 ? (
            peopleToPickup.map(({ name, relation }, index) => (
              <Form.Group key={index} widths={2}>
                <Form.Input label={`#${index + 1} Name`} readOnly value={_defaultTo(name, '-')}/>
                <Form.Input label='Relation' readOnly value={_defaultTo(relation, '-')}/>
              </Form.Group>
            ))
          ) : (
            <p className='text-gray'>The are not authorized people to pick up.</p>
          )
        }
      </Form>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }), {
      setClient: clientDetailDuck.creators.setItem
    })
)(ClienInformationShow)
