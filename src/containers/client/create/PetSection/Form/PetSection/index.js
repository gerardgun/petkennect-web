import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { destroy, submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import FormAdditionalInfo from './FormAdditionalInfo'
import FormGalleryInfo from './FormGalleryInfo'
import useModal from '@components/Modal/useModal'
import { parseResponseError } from '@lib/utils/functions'

import clientPetDetailDuck from '@reducers/client/pet/detail'

export const formIds = [ 'pet-create-information', 'pet-create-additional-info' ]

const PetSection = props => {
  const {
    clientPetDetail,
    forms,
    history,
    match,
    destroy,
    submit,
    post,
    put
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(clientPetDetail.status === 'DELETED')
      _handleCancelBtnClick()
  }, [ clientPetDetail.status ])

  const _handleCancelBtnClick = () => {
    // Verify if is modal
    if(isModal) {
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
    const formIndexWithErrors = forms.findIndex(form => {
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

      if(isUpdating)
        return put({ id: clientPetDetail.item.id,...values })
        // return put({ id: clientPetDetail.item.id,...clientPetDetail.item,...values })
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
      else
        return post({ ...clientPetDetail.item,...values })
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
    }
  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  // Verify if is modal
  const isModal = true
  const isUpdating = isModal ? clientPetDetail.item.id : match.params.pet
  const saving = [ 'POSTING', 'PUTTING' ].includes(clientPetDetail.status)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>
                  <Image rounded src='https://react.semantic-ui.com/images/wireframe/square-image.png'/>
                  {isUpdating ? 'Update' : 'Create'} Pet
                </Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={_handleTabChange}
              panes={[
                {
                  menuItem: 'Information',
                  render  : () => <FormInformation onSubmit={_handleSubmit}/>
                },
                {
                  menuItem: 'Additional Info',
                  render  : () => <FormAdditionalInfo onSubmit={_handleSubmit}/>
                },
                isUpdating ? {
                  menuItem: 'Media',
                  render  : () =>   <FormGalleryInfo/>
                } : {}
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button
            content='Cancel' fluid onClick={_handleCancelBtnClick}
            size='large'/>
          <Button
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Pet`}
            disabled={saving}
            fluid
            loading={saving}
            onClick={_handleSaveBtnClick}
            size='large'/>
          {
            isUpdating && (<Button
              color='google plus' content='Delete Pet' fluid
              onClick={_handleOpen} size='large'/>)
          }
          <Divider horizontal>other</Divider>
          <Button
            content='Send Reminder' disabled fluid
            icon='bell outline'/>
          <Button
            content='Print' disabled fluid
            icon='print'/>
          <Button
            content='Incident Report' disabled fluid
            icon='file alternate outline'/>
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={clientPetDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      clientPetDetail: clientPetDetailDuck.selectors.detail(state),

      forms: formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }),
    {
      destroy,
      submit,
      post     : clientPetDetailDuck.creators.post,
      put      : clientPetDetailDuck.creators.put,
      resetItem: clientPetDetailDuck.creators.resetItem
    }
  )
)(PetSection)
