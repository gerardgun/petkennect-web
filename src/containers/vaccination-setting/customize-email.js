import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Search } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import TextAreaEditor from '@components/Common/TextAreaEditor'
import emailTemplateDetailDuck from '@reducers/email-template/detail'

import './styles.scss'

const VaccinationEmailCustomization = (props) => {
  const {
    emailTemplateDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props
  const [ result, setResult ] = useState([])
  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    return props
      .sendEmail({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const isOpened = useMemo(() => getIsOpened(emailTemplateDetail.mode), [ emailTemplateDetail.mode ])

  const SearchDataSet = [ { id: 1 ,title: 'First Name' }, { id: 2, title: 'Last Name' },
    { id: 3, title: 'Animal Name' }, { id: 4, title: 'Location Name' },
    { id: 5, title: 'Location Address 1' }, { id: 6, title: 'Location Address 2' },
    { id: 7, title: 'Location City' }, { id: 8, title: 'Location State' },
    { id: 9, title: 'Location Zip' }, { id: 10, title: 'Location Phone' },
    { id: 11, title: 'Location Fax' }, { id: 12, title: 'Location Email' },
    { id: 13, title: 'Location Hours' }
  ]

  const _handleSearchInputChange = (e,{ value }) => {
    const result_array = SearchDataSet.filter((_value) =>{
      if(value == '')
        return _value
      else if(_value.title.toLowerCase().includes(value.toLowerCase()))
        return value
    })
    setResult(result_array)
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
           Customize Email Template
          </Header>
          <Field component='input' name='body_text' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Name'
              name='purpose'
              placeholder='Enter Name'/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Subject'
              name='subject'
              placeholder='Enter subject'/>
          </Form.Group>
          <label>Variables</label>
          <br></br>
          <label>You can use the following variables to customize this template</label>
          <Form.Group widths='equal'>
            <div className='search-dropdown pt0 pb0 search-margin'>
              <Search
                fluid
                input={{ icon: 'search', iconPosition: 'right' }}
                onSearchChange={_handleSearchInputChange}
                placeholder='Search for a variable'
                results={result}/>
            </div>
          </Form.Group>
          {/* <Form.Group widths='equal'>

            <Field
              component={FormField}
              control={Search}
              label='You can use the following variables to customize this template'
              name='variable'
              onChange=''
              placeholder='search for a variable'
              selectOnBlur={false}/>

          </Form.Group> */}
          <p>{'{First Name},{Last Name},{Animal Name},{Location Name},'}</p>
          <p>{'{Location Address 1},{Location Address 2},{Location City},{Location State},'}</p>
          <p>{'{Location Zip},{Location Phone},{Location Fax,{Location Email},'}</p>
          <p>{'{Location Hours}'}</p>

          <Form.Group className='ph8' widths='equal'>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextAreaEditor}
                label='Description'
                name='body_text'
                required/>
            </Form.Group>
          </Form.Group>
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={'Save'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      return {
        emailTemplateDetail: emailTemplateDetailDuck.selectors.detail(state)
      }
    },
    {
      resetItem: emailTemplateDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'email-template-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        subject  : Yup.string().required('Subject is required'),
        body_text: Yup.string().required('Message is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(VaccinationEmailCustomization)
