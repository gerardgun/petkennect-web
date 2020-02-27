import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { destroy, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Segment, Tab, Table } from 'semantic-ui-react'
import _times from 'lodash/times'
import faker from 'faker'

import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import FormInformation from './FormInformation'
import FormContactData from './FormContactData'
import FormEmergencyData from './FormEmergencyData'
import FormLegalReleases from './FormLegalReleases'
import { parseResponseError } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

const formIds = [ 'client-create-information', 'client-create-contact-data', 'client-create-emergency-data', 'client-create-legal-releases' ]

const ClientCreate = props => {
  const {
    clientDetail,
    forms,
    history,
    match,
    destroy,
    get,
    post,
    put
  } = props

  const submitBtn = useRef(null)
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)

  useEffect(() => {
    if(isUpdating) get(match.params.client)

    return () => {
      destroy(...formIds)
    }
  }, [])

  const _handleSubmit = () => {
    const formIndexWithErrors = isUpdating ? (
      forms.findIndex((form, index) => {
        return Object.keys(form.errors).length > 0
      })
    ) : (
      forms.findIndex((form, index) => {
        return (!form.fields || Object.keys(form.errors).length > 0) && [ 0, 1 ].includes(index)
      })
    )

    if(formIndexWithErrors !== -1) {
      setTabActiveIndex(formIndexWithErrors)
      setTimeout(() => submitBtn.current.ref.current.click(), 100)
    } else {
      console.log(forms.map(item => item.fields))

      if(isUpdating) {
        return put()
          .catch(parseResponseError)
      } else {
        return post()
          .then(() => history.replace('/client/1'))
          .catch(parseResponseError)
      }
    }
  }

  const isUpdating = match.params.client
  const saving = [ 'POSTING', 'PUTTING' ].includes(clientDetail.status)

  return (
    <Layout>
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
              onTabChange={(e, { activeIndex }) => setTabActiveIndex(activeIndex)}
              panes={[
                {
                  menuItem: 'Information',
                  render: () => <FormInformation onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Contact Data',
                  render: () => <FormContactData onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Emergency Data',
                  render: () => <FormEmergencyData onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Legal Releases',
                  render: () => <FormLegalReleases onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Interaction History',
                  render: () => (
                    <>
                      <Table basic='very' selectable className='table-primary'>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Staff/Location</Table.HeaderCell>
                            <Table.HeaderCell>Comments</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {
                            _times(5, index => {
                              return (
                                <Table.Row key={index}>
                                  <Table.Cell>
                                    {faker.date.past().toLocaleString()}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {faker.address.streetAddress()}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {faker.lorem.paragraph()}
                                  </Table.Cell>
                                </Table.Row>
                              )
                            })
                          }
                        </Table.Body>
                      </Table>

                      <Pagination
                        activePage={1}
                        // onPageChange={_handlePaginationChange}
                        totalPages={3}
                      />
                    </>
                  ),
                }
              ]} />
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button as={Link} content='Cancel' fluid size='large' to='/client' />
          <Button
            color='teal'
            content='Create Client'
            disabled={saving}
            form={formIds[activeTabIndex]}
            loading={saving}
            fluid
            ref={submitBtn}
            size='large'
            type='submit' />
          <Divider horizontal>other</Divider>
          <Button fluid icon='mail outline' content='Send Email' />
          <Button fluid icon='print' content='Print' />
          <Button fluid icon='file alternate outline' content='View Records' />
          <Button fluid icon='share square' content='Email Records' />
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

// const registeredFields = Object.keys(state.form[props.form].registeredFields || {})
// const initialValues = registeredFields.reduce((a, b) => ({ ...a, [b]: clientDetail.item[b] }), {})

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      forms       : formIds.map(formId => ({
        fields: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      })),
    }),
    {
      destroy,
      get : clientDetailDuck.creators.get,
      post: clientDetailDuck.creators.post,
      put : clientDetailDuck.creators.put
    }
  ),
)(ClientCreate)
