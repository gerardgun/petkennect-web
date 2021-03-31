
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Form, Header, Input, Select } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import useZipInputSearch from '@components/useZipInputSearch'
import { AddressTypeOptions } from '@lib/constants/client'

export const AddressList = ({ fields, meta: { error, submitFailed, form }, ...props }) => {
  const dispatch = useDispatch()
  const [ zipOptions, { _handleZipSearchChange } ] = useZipInputSearch(props.zip, props.zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    if(fields.length === 0)
      fields.push({ ...addressInitialState, type: 'home' }) // Add a default item
  }, [])

  const _handleAddBtnClick = () => fields.push({ ...addressInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)
  const _handleZipChange = (zipId, fieldName) => {
    const zip = props.zip.items.find(item => item.id === zipId)

    dispatch(change(form, `${fieldName}.country_code`, zip.country_code))
    dispatch(change(form, `${fieldName}.state`, zip.state))
    dispatch(change(form, `${fieldName}.city`, zip.city))
  }

  const addressInitialState = {
    description: '',
    zip_code   : null,
    type       : null
  }

  return (
    <>
      <Header as='h6' className='section-header' color='blue'>Home Address</Header>
      {
        fields.map((item, index) => (
          <Fragment key={index}>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label={'Street Address'}
                name={`${item}.description`}
                placeholder='Enter address'
                required/>
              <Field
                component={FormField}
                control={Select}
                disabled={props.zip.status === 'GETTING'}
                label='Zip'
                loading={props.zip.status === 'GETTING'}
                name={`${item}.zip_code`}
                onChange={zipId => _handleZipChange(zipId, item)}
                onSearchChange={_handleZipSearchChange}
                options={zipOptions}
                placeholder='Search zip'
                required
                search
                selectOnBlur={false}/>
            </Form.Group>

            <Form.Group widths={3}>
              <Form.Field>
                <Field
                  component={FormField}
                  control={Input}
                  label='Country'
                  name={`${item}.country_code`}
                  readOnly/>
              </Form.Field>
              <Form.Field>
                <Field
                  component={FormField}
                  control={Input}
                  label='State'
                  name={`${item}.state`}
                  readOnly/>
              </Form.Field>
              <Form.Field>
                <Field
                  component={FormField}
                  control={Input}
                  label='City'
                  name={`${item}.city`}
                  readOnly/>
              </Form.Field>
            </Form.Group>

            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                disabled={index === 0}
                label='Type'
                name={`${item}.type`}
                options={AddressTypeOptions}
                placeholder='Select a type'
                required
                selectOnBlur={false}/>

              {
                index !== 0 && (
                  <Form.Button
                    basic color='red' content='Delete Address'
                    data-index={index}
                    icon='trash alternate outline'
                    label='&nbsp;'
                    onClick={_handleRemoveBtnClick}
                    type='button'/>
                )
              }
            </Form.Group>

            <br/>

          </Fragment>
        ))
      }

      <div>
        <Button
          basic color='teal' content='Add Address'
          icon='plus'
          onClick={_handleAddBtnClick}
          type='button'/>
      </div>

      {
        submitFailed && error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )
      }
    </>
  )
}

export default AddressList
