import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentTypeForm from  './Form'

import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const PetIncidentTypeList = ({ ...props }) => {
  const { petIncidentTypeDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPetIncidentTypes()
  }, [])

  useChangeStatusEffect(props.getPetIncidentTypes, status)

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
            <Header as='h2'>Incident Types</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' disabled/>
            <Button
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Incident'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentTypeDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>
      <PetIncidentTypeForm/>
      <ModalDelete
        duckDetail={petIncidentTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petIncidentTypeDetail: petIncidentTypeDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentTypes: petIncidentTypeDuck.creators.get,
      setItem            : petIncidentTypeDetailDuck.creators.setItem
    })
)(PetIncidentTypeList)
