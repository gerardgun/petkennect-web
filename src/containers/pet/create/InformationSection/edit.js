import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'

import PetForm, { formId } from './../../form'

import petDetailDuck from '@reducers/pet/detail'

function PetInformationEdit({ petDetail, ...props }) {
  const { item: pet } = petDetail

  const _handleCancelBtnClick = () => {
    props.setPet(pet, 'READ')
  }

  const saved = [ 'POSTED', 'PUT' ].includes(petDetail.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Pet Info</Header>
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
        <PetForm/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      setPet: petDetailDuck.creators.setItem
    })
)(PetInformationEdit)
