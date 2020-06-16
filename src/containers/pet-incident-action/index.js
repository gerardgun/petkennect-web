import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentActionForm from  './Form'

import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentActionDetailDuck from '@reducers/pet/incident-action/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const PetIncidentActionList = ({ ...props }) => {
  const { petIncidentActionDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPetIncidentActions()
  }, [])

  useChangeStatusEffect(props.getPetIncidentActions, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option , item) => {
    if(option === 'edit') {props.setItem(item, 'UPDATE')}
    else if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Incident Actions</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' disabled/>
            <Button
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Action'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentActionDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
      petIncidentActionDetail: petIncidentActionDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentActions: petIncidentActionDuck.creators.get,
      setItem              : petIncidentActionDetailDuck.creators.setItem
    })
)(PetIncidentActionList)
