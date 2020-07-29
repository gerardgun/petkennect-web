import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Header, Button , Divider } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'

import ShowForm from './show'
import EditForm from './edit'

import clientDetailDuck from '@reducers/client/detail'
import { destroy, submit, getFormValues, getFormSyncErrors } from 'redux-form'
import { parseResponseError } from '@lib/utils/functions'

const formId = 'client-edit-information'

function FormInformation(props) {
  const { clientDetail , destroy, submit } = props

  const { client: clientId } = useParams()

  const [ isUpdating, setIsUpdating ] = useState(false)
  const _handleEditClick = () => {
    setIsUpdating(true)
  }

  const _handleCancelBtnClick = () => {
    setIsUpdating(false)
    props.getClient(clientId)
    destroy([ formId ])
  }

  const _handleSaveBtnClick = () => {
    submit(formId)
  }

  const _handleSubmit = () => {
    const formWithErrors
       = Object.keys(props.form.errors).length > 0

    if(formWithErrors) {
      // setTimeout(() => submit(formId), 100)
    } else {
      const values = props.form.values

      let finalValues = Object.entries(values)
        .filter(([ , value ]) => value !== null)
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

      if(isUpdating)
        return props.put({ id: clientDetail.item.id,...finalValues })
          .then(_handleCancelBtnClick)
          .catch(parseResponseError)
    }
  }

  const saving = [ 'PUTTING' ].includes(clientDetail.status)

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Client Info
        </Header>
        {isUpdating ? <div>
          <Button
            basic
            className='w120'
            color='teal'
            content='Cancel' disabled={saving}
            onClick={_handleCancelBtnClick}
            size='small'/>
          <Button
            className='ml16'
            color='teal'
            content='Save Changes'
            disabled={saving}
            loading={saving}
            // eslint-disable-next-line react/jsx-handler-names
            onClick={_handleSaveBtnClick}
            size='small'/>
        </div> : (

          <Button
            as={Link}
            icon='edit'
            onClick={_handleEditClick}
            size='small'/>
        )}
      </div>
      <Divider className='m0'/>
      {
        isUpdating
          ? <EditForm onSubmit={_handleSubmit}/>
          :  <ShowForm clientDetail={clientDetail}/>}
    </div>
  )
}

FormInformation.propTypes = {  }

FormInformation.defaultProps = {  }

export default compose(
  connect(
    ({ ...state }) => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      form        : {
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }
    }), {
      submit,
      destroy,
      put      : clientDetailDuck.creators.put,
      getClient: clientDetailDuck.creators.get,
      resetItem: clientDetailDuck.creators.resetItem
    })
)(FormInformation)

