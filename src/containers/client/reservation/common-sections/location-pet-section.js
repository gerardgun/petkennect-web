import React  from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Form,  Header, Select, Dropdown } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import 'react-day-picker/lib/style.css'
// import '../styles.scss'

const LocationPetForm = ({ ...props }) => {
  const {
    petReservationDetail,
    location,
    clientPet,
    error, handleSubmit, reset,multiple
  } = props

  return (
    <>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Header as='h3' className='section-info-header'>Select location and pet</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Location'
            name='location'
            options={location.items.map(_location =>
              ({ key: _location.id, value: _location.id, text: `${_location.code}` }))
            }
            placeholder='Location'
            required
            selectOnBlur={false}/>
          <Field
            closeOnChange
            component={FormField}
            control={Dropdown}
            disabled={petReservationDetail.item.pet != undefined}
            fluid
            label='Pet'
            multiple={multiple}
            name='pet'
            options={clientPet.items.map((_clientPet) => ({
              key  : _clientPet.id,
              value: _clientPet.id,
              text : `${_clientPet.name}`
            }))}
            placeholder='Search pet'
            required
            selectOnBlur={false}
            selection/>
        </Form.Group>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

      </Form>
    </>
  )
}

LocationPetForm.propTypes = {
}

LocationPetForm.defaultProps = { }

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)

      return {

        petReservationDetail,
        clientPet: clientPetDuck.selectors.list(state),
        location : locationDuck.selectors.list(state)

      }
    }

  )
)(LocationPetForm)
