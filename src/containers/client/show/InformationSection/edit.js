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
      <Grid className='petkennect-profile-body-header div-client-info-edit-button'>
        <Grid.Column
          computer={6} mobile={10} tablet={6}
          verticalAlign='middle'>
          <Header as='h2'>Client Info</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={10} mobile={12} tablet={10}>
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
