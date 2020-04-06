import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { submit, getFormSyncErrors, getFormValues } from 'redux-form'
import { Button, Divider, Grid, Header, Segment, Tab } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormInformation from './FormInformation'
import useModal from '@components/Modal/useModal'

import clientDetailDuck from '@reducers/client/detail'
import AdditionalInfoSection from './AdditionalInfoSection';
import MediaSection from './MediaSection';


const ClientSection = props => {
  const {
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0);
  const [ open, { handleOpen, handleClose } ] = useModal();

  const _handleSubmit = () => {

  };

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>Create Pet</Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={(e, { index }) => setTabActiveIndex(index)}
              panes={[
                {
                  menuItem: 'Information',
                  render: () => <FormInformation onSubmit={_handleSubmit} />,
                },
                {
                  menuItem: 'Additional Info',
                  render: () => <AdditionalInfoSection />,
                },
                {
                  menuItem: 'Media',
                  render: () => <MediaSection />,
                },
              ]} />
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button as={Link} content='Cancel' fluid size='large' to='/client' />
          <Button
            color='teal'
            content="Update Pet"
            disabled={false}
            fluid
            loading={false}
            onClick={() => null}
            size='large' />
          <Button
            color='google plus'
            content='Delete Pet'
            fluid
            onClick={() => null}
            size='large'
          />

          <Divider horizontal>Quick Actions</Divider>

          <Button fluid icon='mail outline' content='Send Reminder' />
          <Button fluid icon='print' content='Print' />
          <Button fluid icon='file alternate outline' content='Incident Report' />
          <Button fluid icon='share square' content='Go To Client' />
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={clientDetailDuck}
        onClose={handleClose}
        open={open} />
    </>
  )
};

const mapStateToProps = state => ({});

const mapDispatchToProps  = {
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ClientSection)
