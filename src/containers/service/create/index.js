import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { submit, getFormSyncErrors, getFormValues, destroy, reset } from 'redux-form'
import { Button, Grid, Header, Segment, Tab, Menu, Label, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import FormAddons from './FormAddons'

import useModal from '@components/Modal/useModal'
import { parseResponseError } from '@lib/utils/functions'

import serviceDetailDuck from '@reducers/service/detail'
import Layout from '@components/Layout'
import ServiceTypes from '@lib/constants/ServiceTypes'

export const formIds = [ 'service-create-information' ]

const ServiceCreate = props => {
  const {
    serviceDetail,
    forms,
    history,
    resetItem,
    match,
    submit,
    post,
    put,
    destroy
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const  { addons = [] } = serviceDetail.item

  useEffect(()=> {
    if(isUpdating)
      props.get(match.params.id)

    return () => {
      destroy(...formIds)
      resetItem()
    }
  }, [ match.params.id ])

  useEffect(() => {
    if(serviceDetail.status === 'DELETED')
      history.replace('/service')
  }, [ serviceDetail.status ])

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

      if(isUpdating)
        return put({ id: serviceDetail.item.id, ...finalValues })
          .catch(parseResponseError)
      else
        return post(finalValues)
          .then(result => history.replace(`/service/${result.id}`))
          .catch(parseResponseError)
    }
  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  const isUpdating = Boolean(match.params.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(serviceDetail.status)

  return (
    <Layout>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>{isUpdating ? `Update ${ServiceTypes[serviceDetail.item.type]}` : 'Create'} Service</Header>
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
                isUpdating ?  {
                  menuItem: (
                    <Menu.Item key='pets'>
                      <Icon name='paw'/> Addons <Label>{addons.length}</Label>
                    </Menu.Item>
                  ),
                  render: () => <FormAddons/>
                } : {}
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button
            as={Link} content='Cancel' fluid
            size='large' to='/service'/>
          <Button
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Service`}
            disabled={saving}
            fluid
            loading={saving}
            onClick={_handleSaveBtnClick}
            size='large'/>
          {
            isUpdating && serviceDetail.status === 'GOT' && serviceDetail.item.type === 'C' && (<Button
              color='google plus' content='Delete Service' fluid
              onClick={_handleOpen} size='large'/>)
          }
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={serviceDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Layout>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      serviceDetail: serviceDetailDuck.selectors.detail(state),
      forms        : formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }),
    {
      submit,
      destroy,
      reset,
      resetItem: serviceDetailDuck.creators.resetItem,
      post     : serviceDetailDuck.creators.post,
      get      : serviceDetailDuck.creators.get,
      put      : serviceDetailDuck.creators.put
    }
  )
)(ServiceCreate)
