import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
// import { submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Segment, Tab } from 'semantic-ui-react'

// import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
// import useModal from '@components/Modal/useModal'

import petDetailDuck from '@reducers/pet/detail'
import AdditionalInfoSection from './AdditionalInfoSection'
import MediaSection from './MediaSection'

const PetSection = (props) => {
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  // const [ open, { /* _handleOpen, */_handleClose } ] = useModal()
  const {  id } = useParams()
  useEffect(()=> {
    props.get(id)
  },[ id ])
  const _handleSubmit = () => {

  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>Info Pet</Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={_handleTabChange}
              panes={[
                {
                  menuItem: 'Information',
                  render  : () => <FormInformation onSubmit={_handleSubmit}/>
                },
                {
                  menuItem: 'Additional Info',
                  render  : () => <AdditionalInfoSection/>
                },
                {
                  menuItem: 'Media',
                  render  : () => <MediaSection/>
                }
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button
            as={Link} content='Cancel' fluid
            size='large' to='/client'/>
          <Button
            color='teal'
            content='Update Pet'
            disabled={false}
            fluid
            loading={false}
            size='large'/>
          <Button
            color='google plus'
            content='Delete Pet'
            fluid
            size='large'/>

          <Divider horizontal>Quick Actions</Divider>

          <Button content='Send Reminder' fluid icon='mail outline'/>
          <Button content='Print' fluid icon='print'/>
          <Button content='Incident Report' fluid icon='file alternate outline'/>
          <Button content='Go To Client' fluid icon='share square'/>
        </Grid.Column>
      </Grid>

      {/* <ModalDelete
        duckDetail={clientDetailDuck}
        onClose={_handleClose}
        open={open}/> */}
    </>
  )
}

export default compose(
  withRouter,
  connect(
    () => ({}),
    {
      get: petDetailDuck.creators.get
    }
  )
)(PetSection)
