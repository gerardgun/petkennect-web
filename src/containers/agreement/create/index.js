import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { submit, getFormSyncErrors, getFormValues, destroy, reset } from 'redux-form'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'

import useModal from '@components/Modal/useModal'
import { parseFormValues, parseResponseError } from '@lib/utils/functions'

import agreementDetailDuck from '@reducers/agreement/detail'

const Layout = loadable(() => import('@components/Common/Layout'))
const FormInformation = loadable(() => import('./FormInformation'))
const ModalDelete = loadable(() => import('@components/Modal/Delete'))

export const formIds = [ 'agreement-create-information' ]

const AgreementCreate = props => {
  const {
    agreementDetail,
    history,
    resetItem,
    match,
    submit,
    post,
    put,
    destroy
  } = props

  const [ activeTabIndex ] = useState(0)
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(()=> {
    if(isUpdating)
      props.get(match.params.id)

    return () => {
      destroy(...formIds)
      resetItem()
    }
  }, [ match.params.id ])

  useEffect(() => {
    if(agreementDetail.status === 'DELETED')
      history.replace('/setup/agreement/')
  }, [ agreementDetail.status ])

  const _handleSaveBtnClick = () => {
    const formId = formIds[activeTabIndex]

    if(formId) submit(formId)
    else _handleSubmit()
  }

  const _handleSubmit = values => {
    values = parseFormValues(values)

    values.is_active = Boolean(values.is_active)

    if(isUpdating)
      return put({ id: agreementDetail.item.id, ...values })
        .catch(parseResponseError)
    else
      return post(values)
        .then(result => history.replace(`/setup/agreement/${result.id}`))
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(match.params.id)
  // const isUpdating = false
  const saving = [ 'POSTING', 'PUTTING' ].includes(agreementDetail.status)

  return (
    <Layout>
      <Grid className='form-primary'>
        <Grid.Column
          computer={12} mobile={16} tablet={16}>
          <Segment className='segment-content'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>{isUpdating ? 'Update' : 'Create'} Agreement</Header>
              </Grid.Column>
            </Grid>
            <FormInformation onSubmit={_handleSubmit}/>

          </Segment>
        </Grid.Column>
        <Grid.Column
          className='form-primary-actions vertical'
          computer={4} mobile={16} tablet={16}>
          <Segment className='segment-content'>
            <Button
              as={Link} content='Cancel' fluid
              to='/setup/agreement/'/>
            <Button
              color='teal'
              content={`${isUpdating ? 'Update' : 'Create'} Agreement`}
              disabled={saving}
              fluid
              loading={saving}
              onClick={_handleSaveBtnClick}
              size='large'/>
            {
              isUpdating &&  (<Button
                color='google plus' content='Delete Agreement' fluid
                onClick={_handleOpen} size='large'/>)
            }
          </Segment>
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={agreementDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Layout>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      agreementDetail: agreementDetailDuck.selectors.detail(state),
      forms          : formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }),
    {
      submit,
      destroy,
      reset,
      resetItem: agreementDetailDuck.creators.resetItem,
      post     : agreementDetailDuck.creators.post,
      get      : agreementDetailDuck.creators.get,
      put      : agreementDetailDuck.creators.put
    }
  )
)(AgreementCreate)
