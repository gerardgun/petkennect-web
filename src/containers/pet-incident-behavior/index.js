import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentBehaviorForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'

import petIncidentBehaviorDuck from '@reducers/pet/incident-behavior'
import petIncidentBehaviorDetailDuck from '@reducers/pet/incident-behavior/detail'

const PetIncidentBehaviorList = ({ petIncidentBehavior, petIncidentBehaviorDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetIncidentBehaviors, petIncidentBehaviorDetail.status)

  useEffect(() => {
    props.getPetIncidentBehaviors()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petIncidentBehavior.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={15} tablet={8}>
            <Header as='h2'>Incident Behavior</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={11} tablet={8}>
            <Button
              color='teal' content='New Behavior'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentBehaviorDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetIncidentBehaviorForm/>
      <ModalDelete
        duckDetail={petIncidentBehaviorDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petIncidentBehavior      : petIncidentBehaviorDuck.selectors.list(state),
      petIncidentBehaviorDetail: petIncidentBehaviorDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentBehaviors: petIncidentBehaviorDuck.creators.get,
      setItem                : petIncidentBehaviorDetailDuck.creators.setItem
    })
)(PetIncidentBehaviorList)
