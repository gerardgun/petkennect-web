import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'

import ClientForm, { formId } from './../../form'

import clientDetailDuck from '@reducers/client/detail'

function ClientInformationEdit({ clientDetail, ...props }) {
  const { item: client } = clientDetail

  const _handleCancelBtnClick = () => {
    props.setClient(client, 'READ')
  }

  const saved = [ 'POSTED', 'PUT' ].includes(clientDetail.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(clientDetail.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column verticalAlign='middle' width={6}>
          <Header as='h2'>Client Info</Header>
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
        <ClientForm/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }), {
      setClient: clientDetailDuck.creators.setItem
    })
)(ClientInformationEdit)
