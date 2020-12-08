import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Segment, Form, Select, Dropdown, Button, Input, Label } from 'semantic-ui-react'
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Message from '@components/Message'
import { syncValidate } from '@lib/utils/functions'
import VersionCreate from './create'

import daycampCardDuck from '@reducers/pet/reservation/daycamp-card'
import daycampCardDetailDuck from '@reducers/pet/reservation/daycamp-card/detail'
import daycampCardQuestionDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question'
import daycampCardQuestionDetailDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question/detail'
import daycampCardAnswerDetailDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-answer/detail'

export const formId = 'day-camp-form'

const DayCampForm = props => {
  const {
    daycampCard,
    daycampCardDetail,
    daycampCardQuestionDetail,
    daycampCardAnswerDetail } = props

  const [ is_active, setIsActive ] = useState(null)
  const [ activeVersion, setActiveVersion ] = useState(null)

  const [ openDeleteVersionModal, {
    _handleOpen : _handleOpenDeleteVersionModal,
    _handleClose :  _handleCloseDeleteVersionModal
  } ] = useModal()

  useEffect(() => {
    if(daycampCardDetail.status === 'POSTED' || daycampCardDetail.status === 'PUT'  || daycampCardDetail.status === 'DELETED')
      props.getDaycampCards()
  }, [ daycampCardDetail.status ])

  useEffect(() => {
    if(daycampCardAnswerDetail.status === 'DELETED')
      props.getDaycampCardQuestions(activeVersion)
  }, [ daycampCardAnswerDetail.status ])

  const AnswerList = ({ fields, meta: { error, submitFailed } }) => {
    const _handleAddBtnClick = () => fields.push({ ...answerInitialState })

    const [ openDeleteAnswerModal, {
      _handleOpen : _handleOpenDeleteAnswerModal,
      _handleClose: _handleCloseDeleteAnswerModal
    } ] = useModal()

    const _handleDeleteAnswerBtnClick = (e, { index }) =>{
      const answerDetail = fields.get(index)
      if(answerDetail.id) {
        props.setAnswerItem(answerDetail, 'DELETE')
        _handleOpenDeleteAnswerModal()
      }
      else {
        fields.remove(index)
      }
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
                <Form>
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
                </Form>
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
        <ModalDelete
          duckDetail={daycampCardAnswerDetailDuck}
          onClose={_handleCloseDeleteAnswerModal}
          open={openDeleteAnswerModal}/>

      </>
    )
  }

  useEffect(() => {
    if(daycampCardQuestionDetail.status === 'POSTED' || daycampCardQuestionDetail.status === 'PUT' || daycampCardQuestionDetail.status === 'DELETED')
      props.getDaycampCardQuestions(activeVersion)
  }, [ daycampCardQuestionDetail.status ])

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
    _handleOpenDeleteVersionModal()
  }

  const QuestionList = ({ fields, meta: { error, submitFailed } }) => {
    const _handleAddBtnClick = () => fields.push(questionInitialState)

    const [ openDeleteQuestionModal, {
      _handleOpen : _handleOpenDeleteQuestionModal,
      _handleClose :  _handleCloseDeleteQuestionModal
    } ] = useModal()

    const _handleDeleteQuestionBtnClick = (e, { index }) =>{
      const questionDetail = fields.get(index)
      if(questionDetail.id) {
        props.setQuestionItem(questionDetail, 'DELETE')
        _handleOpenDeleteQuestionModal()
      }
      else {
        fields.remove(index)
      }
    }

    const _handleSaveQuestionBtnClick = (e, { index })=>{
      const questionDetail = fields.get(index)
      props.postQuestion({ ...questionDetail, card: activeVersion })
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

              <div className='mv16' key={index}>
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
                      className='save-button-align'
                      color='teal'
                      content='Save'
                      data-index={index}
                      index={`${index}`}
                      onClick={_handleSaveQuestionBtnClick}
                      type='button'/>
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
                  <Form>
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
                  </Form>
                  <FieldArray
                    component={AnswerList}
                    name={`${item}.answers`}
                    title='Answer'/>
                </Segment>
              </div>
            )
          })
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
        <ModalDelete
          duckDetail={daycampCardQuestionDetailDuck}
          onClose={_handleCloseDeleteQuestionModal}
          open={openDeleteQuestionModal}/>
      </>
    )
  }

  useEffect(() => {
    props.getDaycampCards()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
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
            <Form.Group style={{ display: 'flex', 'float': 'right' }} width='equal'>
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
                    <Form.Button
                      basic
                      color='red'
                      icon='trash alternate outline'
                      label='&nbsp;'
                      onClick={_handleDeleteVersionBtnClick}
                      type='button'/>
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
              <FieldArray
                component={QuestionList}
                name='questions'
                title='Question'/>
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
              <FieldArray
                component={QuestionList}
                name='questions'
                title='Question'/>
            </>
          ) : null
        }

        <Button
          className='mv28'
          color='teal'  content='Create New Version'
          onClick={_handleAddBtnClick}
          type='button'/>
      </Segment>
      <VersionCreate/>
      <ModalDelete
        duckDetail={daycampCardDetailDuck}
        onClose={_handleCloseDeleteVersionModal}
        open={openDeleteVersionModal}/>
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
      const daycampCardAnswerDetail = daycampCardAnswerDetailDuck.selectors.detail(state)
      const question  = formValueSelector(formId)(state, 'questions')

      return {
        daycampCard  : daycampCard,
        daycampCardDetail,
        daycampCardQuestion,
        daycampCardQuestionDetail,
        daycampCardAnswerDetail,
        initialValues: { questions: daycampCardQuestion.item.length > 0 && daycampCardQuestion.item.map(_item => {
          return ({
            id         : _item.id,
            description: _item.description,
            type       : _item.type,
            answers    : _item.answers.map(_answerItem => { return ({
              id         : _answerItem.id,
              description: _answerItem.description,
              questionId : _item.id,
              card       : _item.card
            })}),
            card: _item.card
          })
        }) },
        hasQuestionChecked: question
      }
    },
    {
      getDaycampCards        : daycampCardDuck.creators.get,
      getDaycampCardQuestions: daycampCardQuestionDuck.creators.get,
      setItem                : daycampCardDetailDuck.creators.setItem,
      setQuestionItem        : daycampCardQuestionDetailDuck.creators.setItem,
      postQuestion           : daycampCardQuestionDetailDuck.creators.post,
      setAnswerItem          : daycampCardAnswerDetailDuck.creators.setItem
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
