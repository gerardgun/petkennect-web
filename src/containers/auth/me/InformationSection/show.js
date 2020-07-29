import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Form, Header, Grid } from 'semantic-ui-react'
import _defaultTo from 'lodash/defaultTo'

import authDuck from '@reducers/auth'

function AuthMeInformationShow({ auth, ...props }) {
  const { item: user } = auth

  const _handleEditBtnClick = () => {
    props.setItem(user, 'UPDATE')
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>My Profile</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button
            basic icon='edit outline' onClick={_handleEditBtnClick}/>
        </Grid.Column>
      </Grid>
      <Form className='petkennect-profile-body-content'>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths={2}>
          <Form.Input label='First Name' readOnly value={_defaultTo(user.first_name, '-')}/>
          <Form.Input label='Last Name' readOnly value={_defaultTo(user.last_name, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Username' readOnly value={_defaultTo(user.username, '-')}/>
          <Form.Input label='Profile Image' readOnly value={user.image_path ? user.image_path.split('/').pop() : '-'}/>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      auth: authDuck.selectors.detail(state)
    }), {
      setItem: authDuck.creators.setItem
    })
)(AuthMeInformationShow)
