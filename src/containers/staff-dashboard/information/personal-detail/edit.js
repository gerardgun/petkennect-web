import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Button, Card } from 'semantic-ui-react'

import EmployeeForm from './form'
import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'

export const formId = 'personal-detail-form'

function PersonalInformationEdit(props) {
  const {
    personalInformationDetail
  } = props

  const { item: client } = personalInformationDetail

  const _handleCancelBtnClick = () => {
    props.setItem(client, 'READ')
  }

  const saved = [ 'POSTED', 'PUT' ].includes(personalInformationDetail.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(personalInformationDetail.status)

  return (
    <Card className='staff-information-styles' fluid>

      <Grid className='heading-style mh0 flex' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Grid.Column className='pb12' width={6}>
          <Header as='h4' className='mb0' style={{ opacity: '0.9', 'float': 'left' }}>
          Personal Details
          </Header>
        </Grid.Column>
        <Grid.Column className='pb8 pt20 pr8' width={10}>
          <Button
            className='mt0 pb8 pt8' color='teal' content='Save Changes'
            disabled={saving} form={formId} loading={saving}
            style={{ 'float': 'right' }} type='submit'/>
          <Button
            basic className='mt0 pb8 pt8' color='teal'
            content={saved ? 'Go back' : 'Cancel'} disabled={saving} onClick={_handleCancelBtnClick}
            style={{ 'float': 'right' }}/>
        </Grid.Column>
      </Grid>
      <EmployeeForm/>
    </Card>
  )
}

export default compose(
  connect(
    state => ({
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }), {
      setItem: personalInformationDetailDuck.creators.setItem
    })
)(PersonalInformationEdit)
