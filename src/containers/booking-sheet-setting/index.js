
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Grid, Header, Segment, Button, Form, Select } from 'semantic-ui-react'

// import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Layout from '@components/Common/Layout'

import BookingSheetSettingDuck from '@reducers/booking-sheet-setting'
import './styles.scss'

const BookingSheetSetting = (props) => {
  useEffect(() => {
    props.getBookingSheetSetting()
  }, [])
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('boardingSheet')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const booleanOptions = [
    {
      key  : 1,
      value: true,
      text : 'Yes'
    },
    {
      key  : 2,
      value: false,
      text : 'No'
    }
  ]

  const notesOptions = [
    {
      key  : 1,
      value: 'showAll',
      text : 'Show All'
    },
    {
      key  : 2,
      value: 'showHighPriority',
      text : 'Show High Priority'
    }
  ]

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Booking Sheet Settings</Header>
          </Grid.Column>
        </Grid>
        <Grid className='mh8'>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Form>
              <Form.Group widths='equal'>
                <Button
                  basic={ActiveInfoItem !== 'boardingSheet'}
                  color='teal'
                  content='Boarding Sheet'
                  name='boardingSheet'
                  onClick={_handleInfoItemClick}/>
                <Button
                  basic={ActiveInfoItem !== 'daycareSheet'}
                  color='teal'
                  content='Daycare Sheet'
                  name='daycareSheet'
                  onClick={_handleInfoItemClick}/>
                <Button
                  basic={ActiveInfoItem !== 'trainingSheet'}
                  color='teal'
                  content='Training Sheet'
                  name='trainingSheet'
                  onClick={_handleInfoItemClick}/>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Button
              className='w120'
              color='teal'
              content='Save'/>
          </Grid.Column>
        </Grid>

        {
          ActiveInfoItem === 'boardingSheet'  && (
            <Form className='mh16 mv32'>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Select Print Size For Boarding Sheet</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='selectPrintSizeForBoardingSheet'
                    options={[
                      { key: 1, value: '8x10', text: '8x10px' },
                      { key: 2, value: '8x12', text: '8x12px' },
                      { key: 1, value: '8x14', text: '8x14px' },
                      { key: 1, value: '10x10', text: '10x10px' },
                      { key: 2, value: '10x12', text: '10x12px' },
                      { key: 1, value: '10x14', text: '10x14px' }
                    ]}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Base Font Size</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='baseFontSize'
                    options={[
                      { key: 1, value: '10', text: '10px' },
                      { key: 2, value: '12', text: '12px' },
                      { key: 1, value: '14', text: '14px' },
                      { key: 2, value: '16', text: '16px' },
                      { key: 1, value: '18', text: '18px' },
                      { key: 2, value: '20', text: '20px' }
                    ]}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Pet Name Font Size</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='petNameFontSize'
                    options={[
                      { key: 1, value: '10', text: '10px' },
                      { key: 2, value: '12', text: '12px' },
                      { key: 1, value: '14', text: '14px' },
                      { key: 2, value: '16', text: '16px' },
                      { key: 1, value: '18', text: '18px' },
                      { key: 2, value: '20', text: '20px' }
                    ]}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Clipboard Gap</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='clipboardGap'
                    options={[
                      { key: 1, value: 'gap', text: 'Gap' },
                      { key: 2, value: 'noGap', text: 'No Gap' }
                    ]}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Show Medication Alert Symbol</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='showMedicationAlertSymbol'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Show Pet Picture</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='showPetPicture'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Show Pet Color Codes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='showPetColorCodes'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Buddy List</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='buddyList'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Vaccination Warning</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='vaccinationWarning'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Selected Booking Question</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='selectedBookingQuestion'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Selected Pet Form Question</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='selectedPetFormQuestion'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Selected Customer Form Question</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='selectedCustomerFormQuestion'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Booking Notes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='bookingNotes'
                    options={notesOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Pet Notes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='petNotes'
                    options={notesOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Customer Notes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='customerNotes'
                    options={notesOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Placement of Notes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='placementOfNotes'
                    options={[
                      { key: 1, value: 'veryTop', text: 'Very Top' },
                      { key: 2, value: 'VeryBottom', text: 'Very Bottom' }
                    ]}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Customer Contact Info</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='customerContactInfo'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Customer Color Codes</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='customerColorCodes'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Emergency Contact Info</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='emergencyContactInfo'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Vet Info</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='vetInfo'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Grid For Scheduled Addon</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='gridForScheduledAddon'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Feeding Grid</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='freedingGrid'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Medication Grid</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='medicationGrid'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Place Grid On Second Page</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='placeGridOnSecondPage'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self label-padding' width={4}>
                  <span>Show Customer Last Name After Pet Name</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='showCustomerLastNameAfterPetName'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='align-self' width={4}>
                  <span>Show Customer Mailing Address</span>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field
                    component={FormField}
                    control={Select}
                    name='showCustomerMailingAddress'
                    options={booleanOptions}
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
            </Form>
          )
        }
        {
          ActiveInfoItem === 'daycareSheet'  && (
            <Grid>daycareSheet</Grid>
          )
        }
        {
          ActiveInfoItem === 'trainingSheet'  && (
            <Grid>trainingSheet</Grid>
          )
        }
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    (...state) => {
      const bookingSheetSetting = BookingSheetSettingDuck.selectors.list(state)

      return {
        bookingSheetSetting,
        initialValues: {
          showCustomerMailingAddress      : true, showCustomerLastNameAfterPetName: true,
          placeGridOnSecondPage           : true, medicationGrid                  : true,
          freedingGrid                    : true, gridForScheduledAddon           : true,
          vetInfo                         : true, emergencyContactInfo            : true,
          selectedCustomerFormQuestion    : true, customerColorCodes              : true,
          customerContactInfo             : true, showMedicationAlertSymbol       : true,
          showPetPicture                  : true, showPetColorCodes               : true,
          buddyList                       : true, vaccinationWarning              : true,
          selectedBookingQuestion         : true, selectedPetFormQuestion         : true,
          petNameFontSize                 : '14', clipboardGap                    : 'noGap',
          selectPrintSizeForBoardingSheet : '8x10', baseFontSize                    : '14',
          placementOfNotes                : 'veryTop', bookingNotes                    : 'showAll',
          petNotes                        : 'showAll', customerNotes                   : 'showAll'
        }
      }
    },
    {
      getBookingSheetSetting: BookingSheetSettingDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'booking-sheet-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(BookingSheetSetting)
