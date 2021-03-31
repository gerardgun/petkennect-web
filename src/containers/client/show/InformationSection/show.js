import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Popup, Container, Form, Header, Grid } from 'semantic-ui-react'
import moment from 'moment'

import { AddressType, Referred, Status, PhoneType } from '@lib/constants/client'

import clientDetailDuck from '@reducers/client/detail'

function ClienInformationShow({ clientDetail, ...props }) {
  const { item: client } = clientDetail
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Client')

  const _handleEditBtnClick = () => {
    props.setClient(client, 'UPDATE')
  }
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  return (
    <Container className='client-information-section' fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column
          computer={8} mobile={11} tablet={8}
          verticalAlign='middle'>
          <Header as='h2'>Client Info</Header>
        </Grid.Column>
        <Grid.Column
          computer={8} mobile={5} tablet={8}
          textAlign='right'>
          <Popup
            content='Send Email' inverted position='top center'
            size='tiny' trigger={<Button
              basic color='teal' icon='mail'/>}/>
          <Popup
            content='Send SMS' inverted position='top center'
            size='tiny' trigger={<Button
              basic color='teal' icon='fax'/>}/>
          <Button
            basic color='teal' icon='edit outline'
            onClick={_handleEditBtnClick}/>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv32 div-client-info-button'>
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
        {/* <Button
          basic={ActiveInfoItem !== 'intraction_history'} color='teal'
          content='Interaction History' name='intraction_history'
          onClick={_handleInfoItemClick}/> */}
      </div>

      <Form className='petkennect-profile-body-content'>
        {ActiveInfoItem === 'Client'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
            <Form.Group widths={2}>
              <Form.Input label='First Name' readOnly value={client.first_name ? client.first_name : '-'}/>
              <Form.Input label='Last Name' readOnly value={client.last_name ? client.last_name : '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Co-Owner/Spouse First Name' readOnly value={client.spouse ? client.spouse : '-'}/>
              <Form.Input label='Co-Owner/Spouse Last Name' readOnly value={client.co_owner_name ? client.co_owner_name : '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Status'>
                <input
                  readOnly
                  style={{
                    color: client.status === 'active' ? 'green' : client.status === 'caution' ? '#fbbd08' : client.status === 'declined' ? 'red' : 'green'
                  }}
                  value={Status[client.status]}/>
              </Form.Input>
              <Form.Input label='Primary Location' readOnly value={client.location ? `${client.location_code} - ${client.location_name}` : '-'}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Contact Date' readOnly value={(client.contact_date && moment(client.contact_date).format('MM/DD/YYYY')) || '-'}/>
              <Form.Input label='Referred' readOnly value={client.referred ? Referred[client.referred] : '-'}/>
              {
                [ 1, 6, 7 ].includes(client.referred) && client.referred_description && (
                  <Form.Input
                    label={
                      props.referred == 1 ? 'Their name' : props.referred == 6 ? 'Referral\'s Name' : 'Description'
                    }
                    readOnly
                    value={client.referred_description}/>
                )
              }
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>Contact Details</Header>

            <Form.Group widths={2}>
              <Form.Input label='Email' readOnly value={client.email ? client.email : '-'}/>
              <Form.Input label='Alt Email' readOnly value={client.alt_email ? client.alt_email :  '-'}/>
            </Form.Group>

            {
              Array.isArray(client.phones) && client.phones.map((item, index) => (
                <Form.Group key={index} widths={2}>
                  <Form.Input label='Phone Number' readOnly value={item.number}/>
                  <Form.Input label='Type' readOnly value={PhoneType[item.type]}/>
                </Form.Group>
              ))
            }

            <Header as='h6' className='section-header' color='blue'>Home Address</Header>

            {
              Array.isArray(client.addresses) && client.addresses.map((item, index) => (
                <React.Fragment key={index}>
                  <Form.Group widths='equal'>
                    <Form.Input label='Street Address' readOnly value={item.description}/>
                    <Form.Input label='Zip' readOnly value={item.zip.postal_code}/>
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Form.Input label='Country' readOnly value={item.zip.country_code}/>
                    <Form.Input label='State' readOnly value={item.zip.state}/>
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Form.Input label='City' readOnly value={item.zip.city}/>
                    <Form.Input label='Type' readOnly value={item.type ? AddressType[item.type] : '-'}/>
                  </Form.Group>

                  {
                    index !== client.addresses.length - 1 && <br/>
                  }
                </React.Fragment>
              ))
            }

            <Header as='h6' className='section-header' color='blue'>Additional People Authorized to Pick Up</Header>
            {
              Array.isArray(client.authorized_people_pick_up) && (
                client.authorized_people_pick_up.length > 0 ? (
                  client.authorized_people_pick_up.map(({ name, phone, relation }, index) => (
                    <Form.Group key={index} widths={3}>
                      <Form.Input label={`#${index + 1} Name`} readOnly value={name}/>
                      <Form.Input label='Relation' readOnly value={relation}/>
                      <Form.Input label='Phone Number' readOnly value={phone}/>
                    </Form.Group>
                  ))
                ) : (
                  <p className='text-gray'>The are not authorized people to pick up.</p>
                )
              )
            }
          </>
        )}

        {ActiveInfoItem === 'Emergency'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Emergency Contacts Information</Header>
            {
              Array.isArray(client.emergency_contact_phones) && (
                client.emergency_contact_phones.length > 0 ? (
                  client.emergency_contact_phones.map(({ name, phone, relation }, index) => (
                    <Form.Group key={index} widths={3}>
                      <Form.Input label={`#${index + 1} Name`} readOnly value={name}/>
                      <Form.Input label='Relation' readOnly value={relation}/>
                      <Form.Input label='Phone Number' readOnly value={phone}/>
                    </Form.Group>
                  ))
                ) : (
                  <p className='text-gray'>The are not contacts.</p>
                )
              )
            }

            <Form.Group widths='equal'>
              <Form.TextArea label='Other Notes' readOnly value={client.emergency_contact_comment ? client.emergency_contact_comment : '-'}/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Vet'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Veterinarian Contact</Header>
            <Form.Group widths={2}>
              <Form.Input label='Veterinarian Name' readOnly value={client.emergency_vet_name ? client.emergency_vet_name : '-'}/>
              <Form.Input label='Veterinarian Phone Number' readOnly value={client.emergency_vet_phones ? client.emergency_vet_phones[0] : '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Veterinarian Facility' readOnly value={client.emergency_vet_location ? client.emergency_vet_location : '-'}/>
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
