import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'

import AuthMeForm, { formId } from './../form'

import authDuck from '@reducers/auth'

function AuthMeInformationEdit({ auth, ...props }) {
  const { item: user } = auth

  const _handleCancelBtnClick = () => {
    props.setItem(user, 'READ')
  }

  const saved = [ 'PATCHED' ].includes(auth.status)
  const saving = [ 'PATCHING' ].includes(auth.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column verticalAlign='middle'  width={6}>
          <Header as='h2'>Update My Profile</Header>
        </Grid.Column>
        <Grid.Column textAlign='right' width={10}>
          <Button
            basic className='w120' color='teal'
            content={saved ? 'Go back' : 'Cancel'} disabled={saving} onClick={_handleCancelBtnClick}/>
          <Button
            color='teal' content='Save Changes'
            disabled={saving} form={formId} loading={saving}
            type='submit'/>
        </Grid.Column>
      </Grid>
      <div className='petkennect-profile-body-content'>
        <AuthMeForm/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth
    }), {
      setItem: authDuck.creators.setItem
    })
)(AuthMeInformationEdit)
