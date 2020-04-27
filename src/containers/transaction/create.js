import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import transactionDetailDuck from '@reducers/transaction/detail'
import organizationDuck from '@reducers/organization'
import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'

const TransactionForm = props => {
  const {
    organization,
    organizationCompany,
    transactionDetail,
    change, error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(() => {
    if((transactionDetail.mode === 'CREATE' || transactionDetail.mode === 'UPDATE') && organization.items.length === 0)
      // Load organization options if it is not loaded yet
      props.getOrganizations()
  }, [ transactionDetail.mode ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const getCompanyOptions = () => {
    return organizationCompany.items.map((item, index) => ({
      key: index, value: item.id, text: item.legal_name
    }))
  }

  const getOrganizationOptions = () => {
    return organization.items.map((item, index) => ({
      key: index, value: item.id, text: item.legal_name
    }))
  }

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSellerChange = sellerId => {
    props.getOrganization(sellerId)

    // Reset company field value
    change('company', undefined)
  }

  const _handleSubmit = values => {
    let finalValues = Object.entries(values)
      .filter(([ , value ]) => Boolean(value))
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    finalValues.transacted_at = `${finalValues.transacted_at}T00:00:00`

    if(isUpdating)
      return props.put({ id: transactionDetail.item.id, ...finalValues })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(finalValues)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const organizations = useMemo(() => getOrganizationOptions(), [ organization.status ])
  const companies = useMemo(() => getCompanyOptions(), [ organizationCompany.status ])
  const isOpened = useMemo(() => getIsOpened(transactionDetail.mode), [ transactionDetail.mode ])
  const isUpdating = Boolean(transactionDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Transaction</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Select}
              disabled={isUpdating}
              label='Seller Organization'
              name='seller'
              onChange={_handleSellerChange}
              options={organizations}
              placeholder='Select organization'
              search
              selectOnBlur={false}/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Select}
              disabled={isUpdating}
              label='Buyer Organization'
              name='buyer'
              options={organizations}
              placeholder='Select organization'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Select}
              disabled={isUpdating}
              label='Company'
              name='company'
              options={
                isUpdating ? [ {
                  key: transactionDetail.item.company, value: transactionDetail.item.company, text: transactionDetail.item.company_legal_name
                } ] : companies
              }
              placeholder='Select company'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Transacted at'
              name='transacted_at'
              type='date'/>
          </Form.Group>

          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}/>
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
    ({ organization, ...state }) => {
      const transactionDetail = transactionDetailDuck.selectors.detail(state)
      let initialValues = { ...transactionDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organization,
        transactionDetail,
        organizationCompany: organizationCompanyDuck.selectors.list(state),
        initialValues
      }
    },
    {
      getOrganization : organizationDetailDuck.creators.get,
      getOrganizations: organizationDuck.creators.get,
      post            : transactionDetailDuck.creators.post,
      put             : transactionDetailDuck.creators.put,
      resetItem       : transactionDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'organization-transaction-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        seller: YupFields.num_required,
        buyer : YupFields.num_required.test(
          'is-different',
          '${path} must be different',
          value => value !== values.seller
        ),
        company      : YupFields.num_required,
        transacted_at: YupFields.date
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TransactionForm)
