/* eslint-disable react/jsx-handler-names */
import React, { useEffect, useState } from 'react'
import { reduxForm } from 'redux-form'
import { Segment, Form, Button } from 'semantic-ui-react'
import loadable from '@loadable/component'
import * as Yup from 'yup'
import { schemaBuilder } from './yup-schema-builder'
import { syncValidate } from '@lib/utils/functions'
import {  parseFormValues } from '@lib/utils/functions'
import  { formElements } from './form-genrator'
import Element from './element'
const Layout = loadable(() => import('@components/Common/Layout'))

const DynamicForm = (props)=>{
  const {
    handleSubmit, reset // redux-form
  } = props
  const [ formElement, setFormElement ] = useState(null)

  useEffect(()=>{
    setFormElement(formElements)
  },[])

  const _handleSubmit = values => {
    values = parseFormValues(values)
    console.log(values)
  }

  return (<>

    <Layout>
      <Segment className='segment-content' padded='very'>
        <Form  id='dynamic-redux-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          {formElement && formElement.map((item,index)=>{
            return (
              <Element formItem={item} key={index}/>
            )
          })}
          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                color='teal'
                content='Submit'
                form='dynamic-redux-form'
                type='submit'/>
            </Form.Field>
          </Form.Group>

        </Form>

      </Segment>
    </Layout>

  </>
  )
}
const schema = schemaBuilder()
export default reduxForm({
  form              : 'dynamic-redux-form',
  destroyOnUnmount  : false,
  enableReinitialize: true,
  validate          : values => {
    values = parseFormValues(values)

    return syncValidate(Yup.object().shape({ ...schema }), values)
  }

})(DynamicForm)

