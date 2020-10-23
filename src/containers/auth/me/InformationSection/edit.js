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
      <Grid className='petkennect-profile-body-header div-client-info-edit-button'>
        <Grid.Column
          computer={8} mobile={15} tablet={10}
          verticalAlign='middle'>
          <Header as='h2'>Update My Profile</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={8} mobile={11} tablet={6}>
          <Button
            basic color='teal'
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
