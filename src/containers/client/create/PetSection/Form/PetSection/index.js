import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { destroy, submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import FormAdditionalInfo from './FormAdditionalInfo'
import FormGalleryInfo from './FormGalleryInfo'
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
    put
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const { client } = useParams()

  useEffect(() => {
    if(petDetail.status === 'DELETED')
      _handleCancelBtnClick()
  }, [ petDetail.status ])

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
        .map(({ fields, ...rest }) => {
          let parsedFields = fields.reduce((a, b) => {
            const fieldname = /^(\w+).*/.exec(b)[1]

            return a.includes(fieldname) ? a : [ ...a, fieldname ]
          }, [])

          return { fields: parsedFields, ...rest }
        })
        .filter(item => item.fields.length > 0 && Boolean(item.values))
        .map(({ fields, values }) => {
          return fields.reduce((a, b) => ({ ...a, [b]: values[b] }), {})
        })
        .reduce((a, b) => ({ ...a, ...b }))

      let finalValues = Object.entries(values)
        .filter(([ , value ]) => value !== null)
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

      if(isUpdating)
        return put({ id: petDetail.item.id,...finalValues })
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
      else
        return post({
          ...petDetail.item,
          ...finalValues
        })
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
    }
  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  // Verify if is modal
  const isModal = true
  const isUpdating = isModal ? petDetail.item.id : match.params.pet
  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)

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
              className='cls-tabHeader'
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
            className='cls-TransCancelBtn'
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
              className='cls-deleteButton'
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
          {isUpdating && !client && <Button
            as={Link}
            content='Go to client' fluid
            icon='share square'
            onClick={_handleCancelBtnClick} to={`/client/${petDetail.item.client}`}/>
          }
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={petDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state),

      forms: formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }),
    {
      destroy,
      submit,
      post     : petDetailDuck.creators.post,
      put      : petDetailDuck.creators.put,
      resetItem: petDetailDuck.creators.resetItem
    }
  )
)(PetSection)
