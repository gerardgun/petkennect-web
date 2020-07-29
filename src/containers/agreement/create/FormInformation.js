import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, change } from 'redux-form'
import { Form, Input, Tab, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import agreementDetailDuck from '@reducers/agreement/detail'

const AgreementCreate = props => {
  const {
    agreementDetail,
    // match,
    error, handleSubmit, initialized, reset, // redux-form
    setFieldValue
  } = props

  const _handleChange = (event, editor) => {
    const data = editor.getData()
    setFieldValue('agreement-create-information','body', data)
  }

  const editorConfiguration = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'Link',
        'bulletedList',
        'numberedList',
        '|',
        'Indent',
        'Outdent',
        '|',
        'Blockquote',
        'insertTable',
        '|',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    }
  }

  useEffect(() => {
    if(!initialized && agreementDetail.item.id)
      props.initialize({
        ...agreementDetail.item
      })
  }, [ agreementDetail.status, agreementDetail.item.id ])

  return (

    <Tab.Pane className='form-primary-segment-tab' loading={agreementDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Name'
            name='name'
            placeholder='Enter name'
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={TextArea}
            hidden={true}
            label='Body'
            name='body'
            placeholder='Enter Body'
            required/>
        </Form.Group>

        <CKEditor
          config={editorConfiguration} data={agreementDetail.item.body} editor={ClassicEditor}
          onChange={_handleChange}/>
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
    </Tab.Pane>
  )
}

export default compose(
  withRouter,
  connect(
    ({  ...state }) => {
      return {
        agreementDetail: agreementDetailDuck.selectors.detail(state)
      }
    },
    {
      setFieldValue: change
    }
  ),
  reduxForm({
    form            : 'agreement-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(AgreementCreate)
