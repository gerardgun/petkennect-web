import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Segment, Form, Select, Dropdown, Button, Input, Label } from 'semantic-ui-react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Message from '@components/Message'
import { parseResponseError } from '@lib/utils/functions'
import VersionCreate from './create'

import daycampCardDuck from '@reducers/pet/reservation/daycamp-card'
import daycampCardDetailDuck from '@reducers/pet/reservation/daycamp-card/detail'
import daycampCardQuestionDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question'
import daycampCardQuestionDetailDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question/detail'

import './styles.scss'

export const formId = 'day-camp-form'

const QuestionList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push(questionInitialState)

  const _handleDeleteQuestionBtnClick = (e, { index }) =>{
    fields.remove(index)
  }

  const questionInitialState = {
    description: '',
    type       : ''
  }

  return (
    <>
      {
        fields.map((item, index) => {
          return (

            <div className='mv16 mh16' key={index}>
              <Grid columns={2} >
                <Grid.Column
                  className='label-margin' computer={6} mobile={10}
                  style={{ textAlign: 'left' }} tablet={6}>
                  <Header as='h4' color='grey'>{`${'QUESTION ' + (index + 1)}`}</Header>
                </Grid.Column>
                <Grid.Column
                  computer={10} mobile={12} style={{ textAlign: 'right' }}
                  tablet={10}>
                  <Button
                    basic
                    color='red'
                    data-index={index} icon='trash alternate outline'
                    index={`${index}`}
                    onClick={_handleDeleteQuestionBtnClick}
                    type='button'/>
                </Grid.Column>
              </Grid>
              <Segment className='location-item'>
                <Form.Group className='flex' widths='2'>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Question'
                    name={`${item}.description`}
                    placeholder='Enter Question'/>
                  <Field
                    className='field-margin'
                    component={FormField}
                    control={Select}
                    name={`${item}.type`}
                    options={[
                      { key: 1, value: 'O', text: 'Open Question' },
                      { key: 2, value: 'M', text: 'Multiple Question' },
                      { key: 3, value: 'C', text: 'Closed Question' }
                    ]}
                    placeholder='Select Type'
                    selectOnBlur={false}/>
                </Form.Group>
                <FieldArray
                  component={AnswerList}
                  name={`${item}.answers`}
                  title='Answer'/>
              </Segment>
            </div>
          )
        })
      }

      <div className='mh16'>
        <Button
          basic
          color='teal'  content='New Question'
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

const AnswerList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push({ ...answerInitialState })

  const _handleDeleteAnswerBtnClick = (e, { index }) =>{
    fields.remove(index)
  }

  const answerInitialState = {
    description: ''
  }

  return (
    <>
      {
        fields.map((item, index) => {
          return (
            <div className='mv16' key={index}>
              <Form.Group className='flex' widths='2'>
                <Field
                  component={FormField}
                  control={Input}
                  label={`${'Answer' + (index + 1)}`}
                  name={`${item}.description`}
                  placeholder='Enter Answer'/>
                <Form.Button
                  basic
                  color='red'
                  data-index={index} icon='trash alternate outline'
                  index={`${index}`} label='&nbsp;'
                  onClick={_handleDeleteAnswerBtnClick}
                  type='button'/>
              </Form.Group>
            </div>
          ) })
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

const DayCampForm = props => {
  const {
    daycampCard,
    daycampCardDetail,
    daycampCardQuestionDetail,
    handleSubmit,
    submitting,
    reset,
    error
  } = props

  const [ is_active, setIsActive ] = useState(null)
  const [ activeVersion, setActiveVersion ] = useState(null)

  useEffect(() => {
    props.getDaycampCards()
  }, [])

  useEffect(() => {
    if(daycampCard.status === 'GOT') {
      const active_card = daycampCard.item.find(_ => _.is_active == true)
      if(active_card) {
        props.getDaycampCardQuestions(active_card.id)
        setActiveVersion(active_card.id)
        setIsActive(true)
      }
    }
  }, [ daycampCard.status ])

  useEffect(() => {
    if(daycampCardDetail.status === 'POSTED' || daycampCardDetail.status === 'PUT'  || daycampCardDetail.status === 'DELETED')
      props.getDaycampCards()
  }, [ daycampCardDetail.status ])

  useEffect(() => {
    if(daycampCardQuestionDetail.status === 'POSTED' || daycampCardQuestionDetail.status === 'PUT' || daycampCardQuestionDetail.status === 'DELETED')
      props.getDaycampCardQuestions(activeVersion)
  }, [ daycampCardQuestionDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleGetQuestion = (e, { value }) => {
    props.getDaycampCardQuestions(value)

    setActiveVersion(value)

    const currentCard = daycampCard.item && daycampCard.item.find(_version => _version.id == value)
    if(currentCard && currentCard.is_active)
      setIsActive(true)
    else
      setIsActive(false)
  }

  const _handleEditVersionBtnClick = ()=> {
    const currentCardDetail = daycampCard.item && daycampCard.item.find(_version => _version.id == activeVersion)
    if(currentCardDetail)
      props.setItem(currentCardDetail, 'UPDATE')
  }

  const _handleDeleteVersionBtnClick = () =>{
    const currentCardDetail = daycampCard.item && daycampCard.item.find(_version => _version.id == activeVersion)

    if(currentCardDetail)
      props.setItem(currentCardDetail, 'DELETE')
  }

  const _handleSubmit = values => {
    return props.post({ ...values, daycamp_card: activeVersion })
      .catch(parseResponseError)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Day Camp Form </Header>
          </Grid.Column >
        </Grid>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Grid className='mh4'>
            <Grid.Column textAlign='right'>
              <Form.Group className='version_form_fields' width='equal'>
                <Dropdown
                  onChange={_handleGetQuestion}
                  options={daycampCard.item.map && daycampCard.item.map(_version =>
                    ({ key  : _version.id, value: _version.id, text : (<p>{`${_version.name}`}  {`${_version.is_active}` == 'true' ?  <Label
                      basic circular color='teal'
                      content='Active'
                      horizontal
                      style={{ minWidth: '5rem' }}></Label> : null}</p>) }))
                  }
                  placeholder='Select version'
                  selection
                  value={activeVersion}/>
                {
                  activeVersion && (
                    <>
                      {
                        !is_active && daycampCard.item.length > 1 && (
                          <Form.Button
                            basic
                            color='red'
                            icon='trash alternate outline'
                            label='&nbsp;'
                            onClick={_handleDeleteVersionBtnClick}
                            type='button'/>
                        )
                      }
                      <Form.Button
                        basic
                        color='teal'
                        icon='edit'
                        label='&nbsp;'
                        onClick={_handleEditVersionBtnClick}
                        type='button'/>
                    </>
                  )
                }
              </Form.Group>

            </Grid.Column>
          </Grid>
          {
            is_active ? (
              <>
                <Message
                  className='mv16 mh16'
                  content={
                    <Grid padded>
                      <Grid.Column className='mb0 pb0' width='16'>
                        <div className='message__title'>This version is Active.</div>
                      </Grid.Column>
                    </Grid>
                  } type='success'/>
              </>
            ) : is_active === false ? (
              <>
                <Message
                  className='mv16 mh16'
                  content={
                    <Grid padded>
                      <Grid.Column className='mb0 pb0' width='16'>
                        <div className='message__title'>This version is not Active.</div>
                      </Grid.Column>
                    </Grid>
                  } type='warning'/>
              </>
            ) : null
          }
          {
            is_active != null && (
              <>
                <Grid.Column
                  className='ui-grid-align'
                  computer={8} mobile={11} tablet={6}>
                  <Button
                    className='mh16'
                    color='teal' content='Save Changes'
                    disabled={submitting} form={formId} loading={submitting}
                    type='submit'/>
                </Grid.Column>
                <FieldArray
                  component={QuestionList}
                  name='questions'
                  props={props}
                  title='Question'/>
              </>
            )
          }
          <Button
            className='mv28 mh16'
            color='teal'  content='Create New Version'
            onClick={_handleAddBtnClick}
            type='button'/>
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
      </Segment>
      <VersionCreate/>
      <ModalDelete duckDetail={daycampCardDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const daycampCard = daycampCardDuck.selectors.detail(state)
      const daycampCardDetail = daycampCardDetailDuck.selectors.detail(state)
      const daycampCardQuestion = daycampCardQuestionDuck.selectors.detail(state)
      const daycampCardQuestionDetail = daycampCardQuestionDetailDuck.selectors.detail(state)

      return {
        daycampCard  : daycampCard,
        daycampCardDetail,
        daycampCardQuestion,
        daycampCardQuestionDetail,
        initialValues: { questions: daycampCardQuestion.item }
      }
    },
    {
      getDaycampCards        : daycampCardDuck.creators.get,
      getDaycampCardQuestions: daycampCardQuestionDuck.creators.get,
      setItem                : daycampCardDetailDuck.creators.setItem,
      setQuestionItem        : daycampCardQuestionDetailDuck.creators.setItem,
      post                   : daycampCardQuestionDetailDuck.creators.post
    }

  ),
  reduxForm({
    form              : 'day-camp-form',
    enableReinitialize: true
    // validate          : values => {
    //   const schema = {
    //   }

    //   return syncValidate(Yup.object().shape(schema), values)
    // }
  })
)(DayCampForm)
