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

  const saved = [ 'POSTED', 'PUT' ].includes(auth.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(auth.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Update My Profile</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
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
