import React from 'react'
import { Field, formValueSelector, getFormSyncErrors } from 'redux-form'
import { Divider, Grid, Header, Icon, Image, Select } from 'semantic-ui-react'
import DayPicker from 'react-day-picker'
import FormField from '@components/Common/FormField'
import { useSelector } from 'react-redux'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import moment from 'moment'
import FormError from '@components/Common/FormError'

const selector = formValueSelector('boarding-form')
const getFormErrors = getFormSyncErrors('boarding-form')
const PetList = ({ fields }) => {
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const { applies_service_type, arriving_date, departing_date } = useSelector(
    (state) =>
      selector(state, 'applies_service_type', 'arriving_date', 'departing_date')
  )
  const formErrors = useSelector((state) => getFormErrors(state))

  const _handleChangeReservation = (value, index) => {
    const packageSelected = fields.get(index).applies_package
    if(packageSelected) {
      const availablePackages = detail.form.package_options.filter(
        ({ reservation_types }) => reservation_types.includes(value)
      )
      if(
        availablePackages.filter(({ value }) => value === packageSelected)
          .length === 0
      )
        fields.splice(index, 1, { ...fields.get(index), applies_package: '' })
    }
  }

  const _handleDayClick = (day, modifiers = {}, index) => {
    if(modifiers.disabled) return

    const applies_selected_days = fields.get(index).applies_selected_days
    if(modifiers.selected) {
      if(applies_selected_days.length > 1)
        fields.splice(index, 1, {
          ...fields.get(index),
          applies_selected_days: applies_selected_days.filter(
            (selectedDay) => !moment(selectedDay).isSame(moment(day))
          )
        })

      return
    }

    fields.splice(index, 1, {
      ...fields.get(index),
      applies_selected_days: [ ...applies_selected_days, day ]
    })
  }

  return (
    <Grid>
      {fields.map((item, index) => (
        <Grid.Row
          className={`align-center grid-pet ${
            fields.get(index).applies_frequency === 'C' ? 'with-picker' : ''
          }`}
          key={index}>
          <Grid.Column largeScreen={13} tablet={16}>
            <Grid>
              <Grid.Column largeScreen={7} tablet={6}>
                <Grid>
                  <Grid.Column width={6}>
                    <Field
                      component={({ input }) => (
                        <Image
                          centered
                          circular
                          className='pet-avatar'
                          src={input.value}/>
                      )}
                      name={`${item}.image_filepath`}/>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Field
                      component={({ input }) => (
                        <Header as='p' className='m0'>
                          {input.value}
                        </Header>
                      )}
                      name={`${item}.name`}/>
                    <Field
                      component={({ input }) => (
                        <Header as='p' className='m0 fw400 f16'>
                          {input.value}
                        </Header>
                      )}
                      name={`${item}.breed_name`}/>
                    <Grid className='flex flex-row m0'>
                      <Icon className='p0 f16' color='teal' name='medkit'/>
                      <Icon className='p0 f16' color='blue' name='mars'/>
                      <i
                        aria-hidden='true'
                        className='p0 f16 mr4'
                        style={{ color: '#51b6ae' }}>
                        <svg
                          fill='currentColor'
                          height='1em'
                          stroke='currentColor'
                          strokeWidth='0'
                          viewBox='0 0 24 24'
                          width='1em'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path d='M4.929,19.081c1.895,1.895,4.405,2.938,7.071,2.938s5.177-1.043,7.071-2.938c3.899-3.899,3.899-10.243,0-14.143 C17.177,3.044,14.665,2,12,2S6.823,3.044,4.929,4.938C1.03,8.837,1.03,15.182,4.929,19.081z M17.657,17.667 c-1.069,1.069-2.385,1.791-3.813,2.129c-0.009-1.602,0.586-3.146,1.691-4.251c1.163-1.163,2.732-1.828,4.277-1.851 C19.501,15.15,18.786,16.538,17.657,17.667z M19.982,11.702c-2.124-0.021-4.284,0.853-5.861,2.429 c-1.532,1.532-2.327,3.68-2.263,5.881c-2.079-0.036-4.033-0.862-5.516-2.345c-1.522-1.523-2.296-3.512-2.332-5.512 c0.077,0.002,0.154,0.014,0.231,0.014c2.115,0,4.16-0.804,5.637-2.28c1.58-1.58,2.457-3.739,2.43-5.873 c2.015,0.076,3.906,0.895,5.349,2.337C19.139,7.834,19.907,9.757,19.982,11.702z M6.343,6.353c1.108-1.108,2.482-1.849,3.973-2.169 c-0.018,1.555-0.685,3.124-1.851,4.291c-1.104,1.103-2.642,1.696-4.238,1.691C4.555,8.769,5.255,7.44,6.343,6.353z'></path>
                        </svg>
                      </i>
                      <Icon
                        className='p0 f16'
                        color='teal'
                        name='map marker alternate'/>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column largeScreen={9} tablet={10}>
                <Grid>
                  <Grid.Column largeScreen={10} tablet={16}>
                    <Field
                      component={FormField}
                      control={Select}
                      disabled={!applies_service_type}
                      name={`${item}.applies_reservation_type`}
                      // eslint-disable-next-line react/jsx-handler-names
                      onChange={(value) => {
                        _handleChangeReservation(value, index)
                      }}
                      options={detail.form.reservation_type_options}
                      placeholder='Select Reservation Type'
                      search
                      selectOnBlur={false}/>
                  </Grid.Column>
                  <Grid.Column largeScreen={10}>
                    <Field
                      component={FormField}
                      control={Select}
                      disabled={!fields.get(index).applies_reservation_type}
                      name={`${item}.applies_package`}
                      options={detail.form.package_options.filter(
                        ({ reservation_types }) =>
                          reservation_types.includes(
                            fields.get(index).applies_reservation_type
                          )
                      )}
                      placeholder='Select Activity Package'
                      required
                      search
                      selectOnBlur={false}/>
                  </Grid.Column>
                  <Grid.Column largeScreen={6}>
                    <Field
                      component={FormField}
                      control={Select}
                      disabled={
                        !(
                          departing_date
                          && arriving_date
                          && fields.get(index).applies_reservation_type
                          && fields.get(index).applies_package
                        )
                      }
                      name={`${item}.applies_frequency`}
                      options={[
                        { text: 'Every Day', value: 1 },
                        { text: 'Every Day except First', value: 2 },
                        { text: 'Every Day except Last', value: 3 },
                        { text: 'Every Day but First and Last', value: 4 },
                        { text: 'Custom', value: 'C' }
                      ]}
                      placeholder='Frequency'
                      required/>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
            <Divider className='w100'/>
          </Grid.Column>
          {fields.get(index).applies_frequency === 'C' && (
            <Grid as='div' className='picker-pet flex flex-column'>
              <DayPicker
                className='selectable-dates'
                disabledDays={[
                  {
                    after : moment(departing_date).toDate(),
                    before: moment(arriving_date).toDate()
                  }
                ]}
                fromMonth={new Date()}
                // eslint-disable-next-line react/jsx-handler-names
                onDayClick={(day, modifiers = {}) =>
                  _handleDayClick(day, modifiers, index)
                }
                selectedDays={fields.get(index).applies_selected_days}/>
              {formErrors.pets
                && formErrors.pets[index]
                && formErrors.pets[index].applies_selected_days && (
                <Grid className='text-error'>
                  <FormError
                    message={formErrors.pets[index].applies_selected_days}/>
                </Grid>
              )}
            </Grid>
          )}
        </Grid.Row>
      ))}
    </Grid>
  )
}

export default PetList
