import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { destroy, submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import FormAdditionalInfo from './FormAdditionalInfo'
import useModal from '@components/Modal/useModal'
import { parseResponseError } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'

export const formIds = [ 'pet-create-information', 'pet-create-additional-info' ]

const PetSection = props => {
  const {
    petDetail,
    forms,
    history,
    match,
    destroy,
    submit,
    post,
    put,
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ open, { handleOpen, handleClose } ] = useModal()

  useEffect(() => {
    if(petDetail.status === 'DELETED') {
      _handleCancelBtnClick()
    }
  }, [ petDetail.status ])

  const _handleCancelBtnClick = () => {
    // Verify if is modal
    if(true) {
      props.resetItem()
      destroy(...formIds)
    } else {
      history.replace('/pet')
    }
  }

  const _handleSaveBtnClick = () => {
    const formId = formIds[activeTabIndex]
    
    if(formId) submit(formId)
    else _handleSubmit()
  }

  const _handleSubmit = () => {
    const formIndexWithErrors = forms.findIndex((form, index) => {
      return Object.keys(form.errors).length > 0
    })

    if(formIndexWithErrors !== -1) {
      setTabActiveIndex(formIndexWithErrors)
      setTimeout(() => submit(formIds[formIndexWithErrors]), 100)
    } else {
      const values = forms
        .filter(item => item.fields.length > 0)
        .map(({ fields, values }) => {
          return fields.reduce((a, b) => ({ ...a, [b]: values[b] }), {})
        })
        .reduce((a, b) => ({ ...a, ...b }))

      if(isUpdating) {
        return put({ id: petDetail.item.id, ...values})
          .catch(parseResponseError)
      } else {
        return post(values)
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
      }
    }
  }

  // Verify if is modal
  const isUpdating = true ? petDetail.item.id : match.params.pet
  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>
                  <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' rounded />
                  {isUpdating ? 'Update' : 'Create'} Pet
                </Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={(e, { activeIndex }) => setTabActiveIndex(activeIndex)}
              panes={[
                {
                  menuItem: 'Information',
                  render: () => <FormInformation onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Additional Info',
                  render: () => <FormAdditionalInfo onSubmit={_handleSubmit} />,
                },
              ]} />
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button content='Cancel' fluid onClick={_handleCancelBtnClick} size='large' />
          <Button
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Pet`}
            disabled={saving}
            fluid
            loading={saving}
            onClick={_handleSaveBtnClick}
            size='large' />
          {
            isUpdating && (<Button color='google plus' content='Delete Pet' fluid onClick={handleOpen} size='large' />)
          }
          <Divider horizontal>other</Divider>
          <Button fluid icon='bell outline' content='Send Reminder' />
          <Button fluid icon='print' content='Print' />
          <Button fluid icon='file alternate outline' content='Incident Report' />
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={petDetailDuck}
        onClose={handleClose}
        open={open} />
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state),
      forms    : formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      })),
    }),
    {
      destroy,
      submit,
      post     : petDetailDuck.creators.post,
      put      : petDetailDuck.creators.put,
      resetItem: petDetailDuck.creators.resetItem,
    }
  ),
)(PetSection)
