import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, span, Step, Form, Input, Select } from 'semantic-ui-react'
import loadable from '@loadable/component'
import FormField from '@components/Common/FormField'

import '../styles.scss'

const FeedingTime = loadable(() => import('./../feeding-times'))
const FeedingMeasurement = loadable(() => import('./../feeding-measurement'))
const FeedingMethod = loadable(() => import('./../feeding-method'))
const FeedingUnit = loadable(() => import('./../feeding-unit'))
const FoodType = loadable(() => import('./../food-type'))
const MealStatus = loadable(() => import('./../meal-status'))

const EditableField = ()=>{
  const [ activeMenuItem, setActiveMenuItem ] = useState('feedingTimes')
  const [ chargesType, setChargesType ] = useState('')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const _handleItemSelect = (value)=>{
    setChargesType(value)
  }

  return (
    <>
      <Grid>
        <Grid.Column
          className='pb0'
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Feeding Charges Setup</b></span>
        </Grid.Column>
        <Grid.Column computer={6} style={{ 'padding-top': '0.9rem' }}>
          <span><b>Do you charge for bagging owner supplied food?</b></span>
        </Grid.Column>

        <Grid.Column  computer={9} style={{ 'padding-top': '0.1rem' , 'padding-left': '1.2rem' }}>
          <Form.Group  >
            <Field
              autoFocus
              component={FormField}
              control={Select}
              name='med_adminstration_charges'
              onChange={_handleItemSelect}
              options={
                [ {
                  key: 1, value: 'noCharge', text: 'No Charges Apply'
                },{
                  key: 2, value: 'perDay', text: 'Yes, Per Day, Per Dog'
                },{
                  key: 3, value: 'perMeal', text: 'Yes, Per Meal, Per Dog'
                },{
                  key: 4, value: 'perBag', text: 'Yes, Per Bag (requires count)'
                } ]
              }
              placeholder='Select Charges'
              required
              selectOnBlur={false}
              style={{ width: '67%' }}/>
          </Form.Group>
        </Grid.Column>
        { chargesType === 'perDay' && <>
          <Grid.Column className='ml16 pt0' computer={6}>
            <span ><b>Enter the Charge Per Day, Per Dog</b></span>
          </Grid.Column>
          <Grid.Column className='pt0 pl0' computer={5}>
            <Form.Group>
              <Form.Field
                className='charges-input'
                control={Input}
                name='fed_charges_per_day'
                type='number'/>
            </Form.Group>
          </Grid.Column></>
        }

        {
          chargesType === 'perMeal'
          && <>
            <Grid.Column className='pt0' computer={6}  >
              <span ><b>Enter the Charge Per Meal, Per Dog</b></span>
            </Grid.Column>
            <Grid.Column className='pt0 pl0' computer={5}>
              <Form.Group>
                <Form.Field
                  className='charges-input'
                  control={Input}
                  name='fed_charges_per_meal'
                  type='number'/>
              </Form.Group>
            </Grid.Column>
          </>
        }

        {
          chargesType === 'perBag'
          && <>
            <Grid.Column className='pt0' computer={6}  >
              <span ><b>Enter the Charge Per Bag</b></span>
            </Grid.Column>
            <Grid.Column className='pt0 pl0'  computer={5}>
              <Form.Group>
                <Form.Field
                  className='charges-input'
                  control={Input}
                  name='fed_charges_per_bag'
                  type='number'/>
              </Form.Group>
            </Grid.Column>
          </>
        }

      </Grid>
      <Grid>
        <Grid.Column
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Adjust Editable Field Values</b></span>
        </Grid.Column>
        <span>Edit field values regarding all things feeding related here.</span>
      </Grid>
      <Grid>
        <Grid.Column
          computer={12} mobile={16} tablet={16}>
          {activeMenuItem === 'feedingTimes' && <span>Use the feeding schedules based on your facilities operations. If you
            charge for a feeding, ensure {'"Charge Applies"'} is enabled.</span>}
          {activeMenuItem === 'foodTypes' && <span>You can add food types here. You can also select if a charge applies for each type.</span> }
          {activeMenuItem === 'feedingMethods' && <span>List methods of feeding here:</span> }
          {activeMenuItem === 'mealStatus' && <span>This field shows up on your feeding reports and run cards if enabled.</span> }
          {activeMenuItem === 'units' && <span>List the units for feeding:</span> }
          {activeMenuItem === 'measurements' && <span>List the measurements for feeding:</span> }
        </Grid.Column>
      </Grid>
      <Grid className='mh0 menu-item-padding ' columns={2}>
        <Grid.Column
          className='grid-step pl0'
          computer={3} mobile={16} tablet={4}>
          <Step.Group fluid vertical>
            <Step
              active={activeMenuItem === 'feedingTimes'} link name='feedingTimes'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Feeding Times</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'foodTypes'} link name='foodTypes'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Food Types</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'feedingMethods'} link name='feedingMethods'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Feeding Methods</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'mealStatus'} link name='mealStatus'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Meal Status</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'units'} link name='units'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Units</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'measurements'} link name='measurements'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Measurements</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
        <Grid.Column
          className='table-margin ml8'
          computer={13} mobile={16} tablet={13}>
          {activeMenuItem === 'feedingTimes' && <FeedingTime/>}
          {activeMenuItem === 'foodTypes' && <FoodType/> }
          {activeMenuItem === 'feedingMethods' && <FeedingMethod/> }
          {activeMenuItem === 'mealStatus' && <MealStatus/> }
          {activeMenuItem === 'units' && <FeedingUnit/> }
          {activeMenuItem === 'measurements' && <FeedingMeasurement/> }
        </Grid.Column>
      </Grid>
    </>

  )
}

export default  compose(
  connect(
    null

  ),
  reduxForm({
    form              : 'editable-field',
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(EditableField)
