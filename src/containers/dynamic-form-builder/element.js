import React from 'react'
import {  Header,Form,Input, Select, TextArea } from 'semantic-ui-react'
import { Field } from 'redux-form'
import _times from 'lodash/times'
import FormField from '@components/Common/FormField'
import CheckboxGroup from '@components/Common/CheckboxGroup'
import RadioGroup from '@components/Common/RadioGroup'
const Element = (props) => {
  const {
    formItem:
    { id, type, label, required, help }
    ,formItem
  } = props
  const meta = { ...formItem.meta }
  switch (type) {
    case 'header' :
      return (
        <Header as={meta.as} content={meta.text}/>
      )
    case 'input-text' :

      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            help='Please fill your full name here'
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}/>
        </Form.Group>

      )
    case 'input-email' :

      return (
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            help={help}
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}
            type='email'/>
        </Form.Group>
      )

    case 'input-website' :

      return (
        <Form.Group widths='equal'>

          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            help={help}
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}/>
        </Form.Group>
      )

    case 'input-number' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            help={help}
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}
            selectOnBlur={false}
            type='number'/>

        </Form.Group>
      )

    case 'dropdown' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            help={help}
            label={label}
            name={id}
            options={meta.options}
            placeholder={meta.placeholder}
            required={required}
            selectOnBlur={false}/>

        </Form.Group>
      )
    case 'input-date' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            help={help}
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}
            type='date'/>

        </Form.Group>
      )
    case 'textarea' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            help={help}
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}/>

        </Form.Group>
      )
    case 'checkbox' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={CheckboxGroup}
            help={help}
            inline={meta.inline}
            label={label}
            name={id}
            options={meta.options}
            required={required}/>

        </Form.Group>
      )
    case 'radio' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            help={help}
            inline={meta.inline}
            label={label}
            name={id}
            options={meta.options}
            required={required}/>

        </Form.Group>
      )
    case 'tag' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            help={help}
            label={label}
            multiple
            name={id}
            options={meta.options}
            placeholder={meta.placeholder}
            required={required}/>

        </Form.Group>
      )
    case 'input-upload' :
      return (
        <Form.Group widths={3}>
          <Field
            component={FormField}
            control={Input}
            help={help}
            icon='upload'
            label={label}
            name={id}
            placeholder={meta.placeholder}
            required={required}
            type='file'/>

        </Form.Group>
      )
    case 'rating' :
      return (
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            help={help}
            label={label}
            name={id}
            options={_times(meta.max_rating, index => ({
              key: index + 1, value: index + 1 , text: `${index + 1}`
            }))
            }

            required={required}/>
        </Form.Group>

      )
    default:
      return null
  }
}

Element.defaultProps = {
  formItem: null
}
export default Element
