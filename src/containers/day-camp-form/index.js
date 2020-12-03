import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Segment, Form, Select, Button, Input, Label } from 'semantic-ui-react'
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Message from '@components/Message'
import { syncValidate } from '@lib/utils/functions'

export const formId = 'day-camp-form'

export const AnswerList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push()
  const _handleRemoveAnswerBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  return (
    <>

      {
        fields.map((answer, index) => (
          <div className='mv16' key={index}>
            <Form>
              <Form.Group className='flex' widths='2'>
                <Field
                  component={FormField}
                  control={Input}
                  label={`${'Answer' + (index + 1)}`}
                  name={`${answer}.answer`}
                  placeholder='Enter Answer'/>
                <Form.Button
                  basic
                  color='red'
                  data-index={index} icon='trash alternate outline' label='&nbsp;'
                  onClick={_handleRemoveAnswerBtnClick}
                  type='button'/>
              </Form.Group>
            </Form>
          </div>
        ))
      }

      <div>
        <Button
          basic
          color='teal'  content='New Answer'
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

const DayCampForm = (props) => {
  const QuestionList = ({ fields, meta: { error, submitFailed } }) => {
    const _handleAddBtnClick = () => fields.push()
    const _handleRemoveQuestionBtnClick = e => fields.remove(e.currentTarget.dataset.index)

    return (
      <>
        {
          fields.map((question, index) => (
            <div className='mv16' key={index}>
              <Grid columns={2} >
                <Grid.Column  className='label-margin' style={{ textAlign: 'left' }}>
                  <Header as='h4' color='grey'>{`${'QUESTION ' + (index + 1)}`}</Header>
                </Grid.Column>
                <Grid.Column style={{ textAlign: 'right' }}>
                  <Form.Button
                    basic
                    color='red'
                    data-index={index} icon='trash alternate outline' label='&nbsp;'
                    onClick={_handleRemoveQuestionBtnClick}
                    type='button'/>
                </Grid.Column>
              </Grid>
              <Segment className='location-item'>
                <Form>
                  <Form.Group className='flex' widths='2'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Question'
                      name={`${question}.question`}
                      placeholder='Enter Question'/>
                    <Field
                      className='field-margin'
                      component={FormField}
                      control={Select}
                      name={`${question}.questionType`}
                      options={[
                        { key: 1, value: 'openQuestion', text: 'Open Question' },
                        { key: 2, value: 'multipleQuestion', text: 'Multiple Question' },
                        { key: 3, value: 'closedQuestion', text: 'Closed Question' }
                      ]}
                      placeholder='Select Type'
                      selectOnBlur={false}/>
                  </Form.Group>
                </Form>
                { props.hasQuestionChecked[index] && props.hasQuestionChecked[index].questionType != 'openQuestion' && (
                  <FieldArray
                    component={AnswerList}
                    name={`${question}.answer`}
                    title='Answer'/>
                ) }

              </Segment>
            </div>
          ))
        }

        <div>
          <Button
            basic
            color='teal'  content='New Question'
            icon='plus icon'
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

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Day Camp Form </Header>
          </Grid.Column >
        </Grid>
        <Grid className='mh4'>
          <Grid.Column textAlign='right'>
            <Form.Group>
              <Field
                component={FormField}
                control={Select}
                name='version'
                options={[
                  { key: 1, value: 'Version1', text: 'Version 1' },
                  { key: 2, value: 'Version2', text: 'Version 2' },
                  { key  : 3, value: 'Version3', text : (<p>Version 3 <Label
                    basic circular color='teal'
                    content='Active'
                    horizontal
                    style={{ minWidth: '5rem' }}></Label></p>) }
                ]}
                placeholder='Select version'
                required
                search
                selectOnBlur={false}/>
            </Form.Group>
          </Grid.Column>
        </Grid>
        {
          props.hasVersionChecked == 'Version3' ? (
            <Message
              className='mv16 mh16'
              content={
                <Grid padded>
                  <Grid.Column className='mb0 pb0' width='16'>
                    <div className='message__title'>This version is Active.</div>
                  </Grid.Column>
                </Grid>
              } type='success'/>
          ) : (
            <Message
              className='mv16 mh16'
              content={
                <Grid padded>
                  <Grid.Column className='mb0 pb0' width='16'>
                    <div className='message__title'>This version is not Active.</div>
                  </Grid.Column>
                </Grid>
              } type='warning'/>
          ) }
        <FieldArray
          component={QuestionList}
          name='question'
          title='Question'/>
        <Button
          className='mv28'
          color='teal'  content='Create New Version'
          type='button'/>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const version  = formValueSelector(formId)(state, 'version')
      const question  = formValueSelector(formId)(state, 'question')

      return {
        // for redux form
        hasVersionChecked : version,
        hasQuestionChecked: question
      }
    }

  ),
  reduxForm({
    form              : 'day-camp-form',
    enableReinitialize: true,
    validate          : values => {
      const schema = {
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DayCampForm)
