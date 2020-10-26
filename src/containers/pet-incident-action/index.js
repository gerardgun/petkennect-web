import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentActionForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'

import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentActionDetailDuck from '@reducers/pet/incident-action/detail'

const PetIncidentActionList = ({ petIncidentAction, petIncidentActionDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetIncidentActions, petIncidentActionDetail.status)

  useEffect(() => {
    props.getPetIncidentActions()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petIncidentAction.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={15} tablet={8}>
            <Header as='h2'>Incident Actions</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={10} tablet={8}>
            <Button
              color='teal' content='New Action'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentActionDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetIncidentActionForm/>
      <ModalDelete
        duckDetail={petIncidentActionDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petIncidentAction      : petIncidentActionDuck.selectors.list(state),
      petIncidentActionDetail: petIncidentActionDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentActions: petIncidentActionDuck.creators.get,
      setItem              : petIncidentActionDetailDuck.creators.setItem
    })
)(PetIncidentActionList)
