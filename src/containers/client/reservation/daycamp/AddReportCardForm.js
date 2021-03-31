import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Segment, Grid, Checkbox, Image, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError } from '@lib/utils/functions'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petReservationDaycampQuestionDuck from '@reducers/pet/reservation/dacamp-question'
import petReservationDaycampQuestionDetailDuck from '@reducers/pet/reservation/dacamp-question/detail'

import clientPetDuck from '@reducers/client/pet'

import { daycampFormId } from './first'

const AddReportCardForm = (props) => {
  const {
    petReservationDetail,
    openQuestion,
    closedQuestion,
    multipleQuestion,
    daycampCardDetail,
    dayCampQuestionsDetail,
    selectedPetDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) =>(mode === 'CREATE' || mode === 'UPDATE')

  useEffect(() => {
    if(isOpened) {
      props.getClientPets()
      props.getDaycampQuestion()
      props.getDaycampCardDetail({ id: petReservationDetail.item.id })
    }
  }, [])

  useEffect(() => {
    if(dayCampQuestionsDetail.status === 'POSTED' || dayCampQuestionsDetail.status === 'PUT' || dayCampQuestionsDetail.status === 'SET_ITEM')
      props.getDaycampQuestion()
    props.getDaycampCardDetail({ id: petReservationDetail.item.id })
  }, [ dayCampQuestionsDetail.status ])

  const _handleClose = () => {
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    let details = []

    Object.keys(values).forEach(function(key) {
      let questionAnswer = key.split('_')
      let questionId = questionAnswer[0]
      let answerId = questionAnswer[1]
      let questionType = questionAnswer[2]
      let description = values[key]
      let detailsArr = {}
      if(questionType === 'openQuestion')
        detailsArr = {
          question   : questionId,
          description: description
        }
      else if(questionType === 'closedQuestion')
        detailsArr = {
          question   : questionId,
          answer     : description,
          description: 'description'
        }
      else
      if(description)
        detailsArr = {
          question   : questionId,
          answer     : answerId,
          description: 'description'
        }

      if(isUpdating) {
        let cardDetailId = daycampCardDetail.items.find(_ => _.question == questionId)
        if(cardDetailId && detailsArr.question)
          details.push({ id: cardDetailId.id,...detailsArr })
        else
        if(detailsArr.question)
          details.push(detailsArr)
      }
      else {
        details.push(detailsArr)
      }
    })

    if(isUpdating)
      return props
        .put({ id: petReservationDetail.item.id, details: { details } })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ id: petReservationDetail.item.id, details: { details } })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(dayCampQuestionsDetail.mode), [
    dayCampQuestionsDetail.mode
  ])
  // const isUpdating = Boolean(daycampCardDetail.items.id)
  const isUpdating = dayCampQuestionsDetail.mode == 'UPDATE' ? true : false

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='add-report-card-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Report Card
          </Header>
          {
            selectedPetDetail && (

              <Segment>
                <Header as='h2' className='report-card-header'>
                  <Image circular src={`${selectedPetDetail.image_filepath}`}/>
                  <Header.Content>
                    <Header as='h6' className='section-header' color='blue'>{selectedPetDetail.name}</Header>
                    <Header.Subheader>Report</Header.Subheader>
                  </Header.Content>
                </Header>

                <Grid className='report-card-radio'>
                  {
                    closedQuestion && closedQuestion.map((questionItem, index)=>(
                      <Grid.Column
                        computer={5} key={index}
                        mobile={16} tablet={8}>
                        <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
                        {
                          questionItem.answers.map((answeritem)=>(
                            <>
                              <div>
                                <label>
                                  <Field
                                    component='input' name={`${questionItem.id}_${questionItem.id}_closedQuestion`} type='radio'
                                    value={`${answeritem.id}`}/>&nbsp;&nbsp;{`${answeritem.description}`}</label>
                              </div>
                              <br/>
                            </>
                          ))
                        }
                      </Grid.Column>
                    ))
                  }

                  {
                    openQuestion && openQuestion.map((questionItem, index)=>(
                      <Grid.Column key={index} width={16}>
                        <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
                        <Field
                          className='w100'
                          component={FormField}
                          control={Form.TextArea}
                          label=''
                          name={`${questionItem.id}_${questionItem.id}_openQuestion`}/>
                      </Grid.Column>
                    ))
                  }

                  {
                    multipleQuestion && multipleQuestion.map((questionItem, index)=>(
                      <Grid.Column
                        computer={5} key={index}
                        mobile={16} tablet={8}>
                        <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
                        {
                          questionItem.answers.map((answeritem)=>(
                            <>
                              <Field
                                component={FormField}
                                control={Checkbox}
                                format={Boolean}
                                label={`${answeritem.description}`}
                                name={`${questionItem.id}_${answeritem.id}_multipleQuestion`}
                                type='checkbox'/>
                            </>
                          ))
                        }
                      </Grid.Column>
                    ))
                  }
                </Grid>
              </Segment>

            )

          }
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
                basic
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Done'
                disabled={submitting}
                loading={submitting}
                type='submit'/>
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
    (state) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(daycampFormId)(state, 'pet')
      const dayCampQuestionsDetail = petReservationDaycampQuestionDetailDuck.selectors.detail(state)
      const clientPet = clientPetDuck.selectors.list(state)
      const openQuestion = dayCampQuestionsDetail.items.questions.filter(_ => _.type === 'O')
      const closedQuestion = dayCampQuestionsDetail.items.questions.filter(_ => _.type === 'C')
      const multipleQuestion =  dayCampQuestionsDetail.items.questions.filter(_ => _.type === 'M')
      const daycampCardDetail = petReservationDaycampQuestionDuck.selectors.detail(state)
      const selectedPetDetail = selectedPets.length > 0 && clientPet.items.find(_ => _.id == selectedPets[0])

      let initialValues = {}
      daycampCardDetail.items
        && daycampCardDetail.items.forEach(element => {
          let getQuestionType = dayCampQuestionsDetail.items.questions.find(_ => _.id == element.question)
          if(getQuestionType)
            if(getQuestionType.type == 'M')
              initialValues[`${element.question}_${element.answer}_multipleQuestion`] = true
            else if(getQuestionType.type == 'C')
              initialValues[`${element.question}_${element.question}_closedQuestion`] = `${element.answer}`
            else
              initialValues[`${element.question}_${element.question}_openQuestion`] = element.description
        })

      return {
        openQuestion,
        closedQuestion,
        multipleQuestion,
        petReservationDetail,
        daycampCardDetail,
        initialValues,
        dayCampQuestionsDetail: dayCampQuestionsDetail,
        selectedPetDetail
      }
    },
    {
      getDaycampCardDetail: petReservationDaycampQuestionDuck.creators.get,
      getDaycampQuestion  : petReservationDaycampQuestionDetailDuck.creators.get,
      getClientPets       : clientPetDuck.creators.get,
      post                : petReservationDaycampQuestionDetailDuck.creators.post,
      put                 : petReservationDaycampQuestionDetailDuck.creators.put,
      resetItem           : petReservationDaycampQuestionDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'add-report-card-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AddReportCardForm)
