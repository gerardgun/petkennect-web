import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Form, Header, Grid } from 'semantic-ui-react'
import moment from 'moment'
import  _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import { Referred } from '@lib/constants/client'
import { formatPhoneNumber } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

function ClienInformationShow({ clientDetail, ...props }) {
  const { item: client } = clientDetail

  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Client')

  const _handleEditBtnClick = () => {
    props.setClient(client, 'UPDATE')
  }

  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const peopleToPickup = Array.isArray(client.authorized_people_pick_up) ? client.authorized_people_pick_up : []

  return (
    <Container className='client-information-section' fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Client Info</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button
            basic color='teal' icon='edit outline'
            onClick={_handleEditBtnClick}/>
        </Grid.Column>
      </Grid>
      <div className='mh40 mv32 div-client-info-button'>
        <Button
          basic={ActiveInfoItem !== 'Client'} color='teal'
          content='Client Information' name='Client'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Emergency'} color='teal'
          content='Emergency Contact' name='Emergency'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Vet'} color='teal'
          content='Vet Information' name='Vet'
          onClick={_handleInfoItemClick}/>
      </div>

      <Form className='petkennect-profile-body-content'>
        {ActiveInfoItem === 'Client'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
            <Form.Group widths={2}>
              <Form.Input label='First Name' readOnly value={_defaultTo(client.first_name, '-')}/>
              <Form.Input label='Last Name' readOnly value={_defaultTo(client.last_name, '-')}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Spouse/Co-owner First Name' readOnly value={_defaultTo(client.spouse, '-')}/>
              <Form.Input label='Last Name' readOnly value={_defaultTo(client.spouse, '-')}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Active' readOnly value={client.is_active ? 'Yes' : 'No'}/>
              <Form.Input label='Location' readOnly value={client.location ? `${client.location_name} - ${client.location_code}` : '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Contact Date' readOnly value={(client.contact_date && moment(client.contact_date).format('MM/DD/YYYY')) || '-'}/>
              <Form.Input label='Referred' readOnly value={_get(Referred, client.referred, '-')}/>
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>Contact Details</Header>
            <Form.Group widths={2}>
              <Form.Input label='Cell Phone' readOnly value={formatPhoneNumber(_get(client, 'phones[0]', '-'))}/>
              <Form.Input label='Home Phone' readOnly value={formatPhoneNumber(_get(client, 'phones[1]', '-'))}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Work Phone' readOnly value={formatPhoneNumber(_get(client, 'phones[2]', '-'))}/>
              <Form.Input label='Other Phone' readOnly value={formatPhoneNumber(_get(client, 'phones[3]', '-'))}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Email' readOnly value={_defaultTo(client.email, '-')}/>
              <Form.Input label='Alt Email' readOnly value={_defaultTo(client.alt_email, '-')}/>
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
          </>
        )}

        {ActiveInfoItem === 'Emergency'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Emergency Contact</Header>
            <Form.Group widths={2}>
              <Form.Input label='Name' readOnly value={_defaultTo(client.emergency_contact_name, '-')}/>
              <Form.Input label='Relation' readOnly value={_defaultTo(client.emergency_contact_relationship, '-')}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Phone' readOnly value={formatPhoneNumber(_get(client, 'emergency_contact_phones[0]', '-'))}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.TextArea label='Other Notes' readOnly value={_defaultTo(client.not_defined, '-')}/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Vet'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Veterinarian Contact</Header>
            <Form.Group widths={2}>
              <Form.Input label='Vet Name' readOnly value={_defaultTo(client.emergency_vet_name, '-')}/>
              <Form.Input label='Veterinary Facility Name' readOnly value={_defaultTo(client.emergency_vet_facility_name, '-')}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Vet Phone' readOnly value={formatPhoneNumber(_get(client, 'emergency_vet_phones[0]', '-'))}/>
              <Form.Input label='Vet Location' readOnly value={_defaultTo(client.emergency_vet_location, '-')}/>
            </Form.Group>
          </>
        )}
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
