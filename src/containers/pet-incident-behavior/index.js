import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentBehaviorForm from  './Form'

import petIncidentBehaviorDuck from '@reducers/pet/incident-behavior'
import petIncidentBehaviorDetailDuck from '@reducers/pet/incident-behavior/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const PetIncidentBehaviorList = ({ ...props }) => {
  const { petIncidentBehaviorDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPetIncidentBehaviors()
  }, [])

  useChangeStatusEffect(props.getPetIncidentBehaviors, status)

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
            <Header as='h2'>Incident Behavior</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' disabled/>
            <Button
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Behavior'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentBehaviorDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
      petIncidentBehaviorDetail: petIncidentBehaviorDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentBehaviors: petIncidentBehaviorDuck.creators.get,
      setItem                : petIncidentBehaviorDetailDuck.creators.setItem
    })
)(PetIncidentBehaviorList)
