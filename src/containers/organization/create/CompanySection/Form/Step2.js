import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import userDuck from '@reducers/user'
import userDetailDuck from '@reducers/user/detail'

// const invitationUserOption = {
//   email     : null,
//   first_name: 'Invite to the company',
//   id        : 20,
//   last_name : null
// }

const Step2 = props => {
  const {
    companyDetail,
    user,
    userDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ userOptions, setUserOptions ] = useState([])

  useEffect(() => {
    if(companyDetail.mode === 'CREATE') setUserOptions([])
  }, [ companyDetail.mode ])

  useEffect(() => {
    if(user.status === 'GOT')
      setUserOptions(
        user.items.map((item, index) => ({
          key  : index++,
          value: item.id,
          text : `${item.first_name} ${item.last_name} - ${item.email}`
        }))
      )
  }, [ user.status ])

  const setUserOptionsFromDetail = () => setUserOptions([
    {
      key  : 1,
      value: userDetail.item.id,
      text : `${userDetail.item.first_name} ${userDetail.item.last_name} - ${userDetail.item.email}`
    }
  ])

  const _handleSubmit = values => {
    let finalValues = Object.entries(values)
      .filter(([ , value ]) => value !== null)
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(!('multilocation' in finalValues)) finalValues.multilocation = false

    const payload = isFromCompanyModule ? finalValues : { ...finalValues, organization: props.match.params.organization }

    return props.post({
      ...payload,
      main_admin: JSON.stringify({
        status    : true,
        first_name: 'Jhon',
        last_name : 'Doe',
        email     : null
      })
    })
      .then(() => {
        props.resetItem()
        reset()
      })
      .catch(parseResponseError)
  }

  const _handleUserBlur = () => {
    setUserOptionsFromDetail()
  }

  const _handleUserChange = userId => {
    props.setUser(
      user.items.find(item => item.id === userId)
    )
  }

  const _handleUserSearchChange = (e, data) => {
    if(data.searchQuery.length > 5)
      props.getUsers({
        search: data.searchQuery
      })
  }

  const isFromCompanyModule = /\/company(\/)?$/.test(props.match.path)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            disabled={user.status === 'GETTING'}
            label=''
            loading={user.status === 'GETTING'}
            name='user'
            onBlur={_handleUserBlur}
            onChange={_handleUserChange}
            onSearchChange={_handleUserSearchChange}
            options={userOptions}
            placeholder='Search user by email'
            search
            selectOnBlur={false}/>
          <Form.Field/>
          <Form.Field/>
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
              content='Back'
              disabled={submitting}
              onClick={props.onBack}
              type='button'/>
            <Button
              color='teal'
              content='Save'
              disabled={submitting}
              loading={submitting}/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

Step2.defaultProps = {
  onBack: () => {}
}

export default compose(
  withRouter,
  connect(
    ({ user, ...state }) => {
      const companyDetail = companyDetailDuck.selectors.detail(state)
      const userDetail = userDetailDuck.selectors.detail(state)

      return {
        companyDetail,
        user,
        userDetail
      }
    },
    {
      getUsers : userDuck.creators.get,
      post     : companyDetailDuck.creators.post,
      resetItem: companyDetailDuck.creators.resetItem,
      setUser  : userDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form            : 'company-form-step-2',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        user: YupFields.num_required
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(Step2)
