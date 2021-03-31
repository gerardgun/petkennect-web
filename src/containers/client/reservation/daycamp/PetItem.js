import React from 'react'
import { Field } from 'redux-form'

import FormField from '@components/Common/FormField'
import { Form, Segment, Header, Select, Checkbox, Input } from 'semantic-ui-react'

function PetItem({ item, yardTypesOptions }) {
  return (
    <Segment >
      <div className='div-kannel-selection'>
        <Header as='h3' className='text-center'>What is {item[0].name}&apos;s information?</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Yard'
            name={`${item[0].id}.yard`}
            options={yardTypesOptions}
            placeholder='Select Type'
            required
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            label='Type'
            name={`${item[0].id}.type`}
            placeholder='Enter Yard Type'
            required
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Lunch'
            name={`${item[0].id}.lunch`}
            type='checkbox'/>
        </Form.Group>
      </div>
    </Segment>
  )
}

PetItem.propTypes = {
}

PetItem.defaultProps = { }

export default PetItem
