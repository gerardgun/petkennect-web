import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Segment, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import FormContactData from './FormContactData'
import FormEmergencyData from './FormEmergencyData'
import FormLegalReleases from './FormLegalReleases'
import InteractionHistory from './InteractionHistory'
import useModal from '@components/Modal/useModal'
import { parseResponseError } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

export const formIds = [ 'client-create-information', 'client-create-contact-data', 'client-create-emergency-data', 'client-create-legal-releases' ]

const ClientSection = props => {
  const {
    clientDetail,
    forms,
    history,
    match,
    submit,
    post,
    put
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(clientDetail.status === 'DELETED')
      history.replace('/client')
  }, [ clientDetail.status ])

  const _handleSaveBtnClick = () => {
    const formId = formIds[activeTabIndex]

    if(formId) submit(formId)
    else _handleSubmit()
  }

  const _handleSubmit = () => {
    const formIndexWithErrors = isUpdating ? (
      forms.findIndex(form => {
        return Object.keys(form.errors).length > 0
      })
    ) : (
      forms.findIndex((form, index) => {
        return (form.fields.length === 0 || Object.keys(form.errors).length > 0) && [ 0, 1 ].includes(index)
      })
    )

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

      // For checkbox values
      if('legal_sign_on' in finalValues) {
        if(!('legal_liability' in finalValues)) finalValues.legal_liability = false
        if(!('legal_kc_waiver' in finalValues)) finalValues.legal_kc_waiver = false
      }

      if(isUpdating)
        return put({ id: clientDetail.item.id, user: clientDetail.item.user, ...finalValues })
          .catch(parseResponseError)
      else
        return post(finalValues)
          .then(result => history.replace(`/client/${result.id}`))
          .catch(parseResponseError)
    }
  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  const isUpdating = match.params.client
  const saving = [ 'POSTING', 'PUTTING' ].includes(clientDetail.status)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>{isUpdating ? 'Update' : 'Create'} Client</Header>
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
                  menuItem: 'Contact Data',
                  render  : () => <FormContactData onSubmit={_handleSubmit}/>
                },
                {
                  menuItem: 'Emergency Data',
                  render  : () => <FormEmergencyData onSubmit={_handleSubmit}/>
                },
                {
                  menuItem: 'Legal Releases',
                  render  : () => <FormLegalReleases onSubmit={_handleSubmit}/>
                },
                isUpdating && ({
                  menuItem: 'Interaction History',
                  render  : () => <InteractionHistory/>
                })
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button
            as={Link} content='Cancel' fluid
            size='large' to='/client'/>
          <Button
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Client`}
            disabled={saving}
            fluid
            loading={saving}
            onClick={_handleSaveBtnClick}
            size='large'/>
          {
            isUpdating && (<Button
              color='google plus' content='Delete Client' fluid
              onClick={_handleOpen} size='large'/>)
          }
          <Divider horizontal>other</Divider>
          <Button content='Send Email' fluid icon='mail outline'/>
          <Button content='Print' fluid icon='print'/>
          <Button content='View Records' fluid icon='file alternate outline'/>
          <Button content='Email Records' fluid icon='share square'/>
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={clientDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      forms       : formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }),
    {
      submit,
      post: clientDetailDuck.creators.post,
      put : clientDetailDuck.creators.put
    }
  )
)(ClientSection)
