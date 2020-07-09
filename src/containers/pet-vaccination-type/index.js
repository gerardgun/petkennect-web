import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetVaccinationTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'

import petVaccinationTypeDuck from '@reducers/pet/vaccination-type'
import petVaccinationTypeDetailDuck from '@reducers/pet/vaccination-type/detail'

const PetVaccinationTypeList = ({ petVaccinationType, petVaccinationTypeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetVaccinationType, petVaccinationTypeDetail.status)

  useEffect(() => {
    props.getPetVaccinationType()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petVaccinationType.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Vaccination Type</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              color='teal' content='New Vaccination'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petVaccinationTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>
      <PetVaccinationTypeForm/>
      <ModalDelete
        duckDetail={petVaccinationTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petVaccinationType      : petVaccinationTypeDuck.selectors.list(state),
      petVaccinationTypeDetail: petVaccinationTypeDetailDuck.selectors.detail(state)
    }), {
      getPetVaccinationType: petVaccinationTypeDuck.creators.get,
      setItem              : petVaccinationTypeDetailDuck.creators.setItem
    })
)(PetVaccinationTypeList)
