import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  useHistory } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetFormModal from './form/modal'
import ExpressCheckInForm from './form/express-check-in'

import { useChangeStatusEffect } from '@hooks/Shared'

import petDuck from '@reducers/pet'
import petDetailDuck from '@reducers/pet/detail'
import petReservationCheckInDetailDuck from '@reducers/pet/reservation/express-check-in/detail'
import petBreedDuck from '@reducers/pet/breed'

import './styles.scss'

const PetList = ({ petDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPets,petDetail.status)
  const history = useHistory()

  useEffect(() => {
    props.getPets({ retired: false })
    props.getPetBreeds()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = (option,item) => {
    if(option === 'delete') {
      props.setItem(item, 'DELETE')
      _handleOpen()
    }
    else if(option === 'express_check_in') {
      props.setReservationCheckInItem({ client: item.client, pet: item.id }, 'CREATE')
    }
    else if(option === 'vaccination' || option === 'services') {
      history.push({
        pathname: `/pet/${item.id}`,
        state   : { option: option }
      })
    }
  }

  const _handleExpressCheckInBtnClick = () =>{
    props.setReservationCheckInItem(null, 'CREATE')
  }

  return (
    <Layout>
      <Segment className='segment-content pet' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Pets</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={8} tablet={12}>
            <Button color='teal' content='Express Check In' onClick={_handleExpressCheckInBtnClick}/>
            <Button color='teal' content='New Pet' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <div className='table-row-padding'>
          <Table duck={petDuck} onOptionClick={_handleOptionClick} onOptionDropdownChange={_handleOptionClick}/>
        </div>
      </Segment>

      <PetFormModal/>
      <ExpressCheckInForm/>
      <ModalDelete
        duckDetail={petDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ pet, ...state }) => ({
      pet,
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      getPets                  : petDuck.creators.get,
      getPetBreeds             : petBreedDuck.creators.get,
      setItem                  : petDetailDuck.creators.setItem,
      setReservationCheckInItem: petReservationCheckInDetailDuck.creators.setItem
    })
)(PetList)
