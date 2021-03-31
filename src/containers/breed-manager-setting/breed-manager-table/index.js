import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid  } from 'semantic-ui-react'
import ModalDelete from '@components/Modal/Delete'

import Table from '@components/Table'

import useModal from '@components/Modal/useModal'

import { useChangeStatusEffect } from '@hooks/Shared'
import AddBreedForm from './create'
import AnimalDetail from './animal-detail'
import ReservationDateByBreed from './reservation-by-date-breed'
import DayCareReservationBreed from './day-care-reservation-breed'
import breedManagementListConfig from '@lib/constants/list-configs/pet/breed-manager-setting'

import BreedManagementDuck from '@reducers/pet/breed-manager-setting'
import BreedManagementDetailDuck from '@reducers/pet/breed-manager-setting/detail'
import clientPetBreedDetailDuck from '@reducers/pet/breed-manager-setting/client-pet-breed/detail'
import reservationByDateBreedDetailDuck from '@reducers/pet/breed-manager-setting/reservation-by-date-breed/detail'
import dayCareReservationDetailDuck from '@reducers/pet/breed-manager-setting/day-care-reservation-breed/detail'

const BreedManagementTable = ({  BreedManagement, BreedManagementDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useChangeStatusEffect(props.getBreedManagement, BreedManagementDetail.status)

  useEffect(() => {
    props.getBreedManagement()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(BreedManagement.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  // const _handleActionButtonClicked = (item) =>{
  //   props.setItem(item, 'READ')
  // }

  const _handleDropdownOptionClick = (option,item)=>{
    // console.log(BreedManagement.selector.selected_items)
    if(option === 'reservation_by_dates')
      props.setreservationDayBreed(item,'CREATE')

    else if(option === 'view_client_pet')
      props.setClientPetBreed(item,'CREATE')

    else if(option === 'day_care_reservations')
      props.setDayCareReservationBreed(item,'CREATE')
  }

  return (

    <Grid>
      <Grid.Column computer={13} mobile={16} tablet={8}>
        <Table
          config={breedManagementListConfig}
          duck={BreedManagementDuck}
          onOptionClick={_handleOptionClick}
          onOptionDropdownChange={_handleDropdownOptionClick}
          onRowClick={_handleRowClick}/>
        <ModalDelete
          duckDetail={BreedManagementDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Grid.Column>
      <AddBreedForm/>
      <AnimalDetail/>
      <ReservationDateByBreed/>
      <DayCareReservationBreed/>
      <Grid.Column
        computer={3} mobile={14} tablet={8}>
        <Button
          basic
          color='teal'
          content='Add Breed'
          icon='Add'
          onClick={_handleAddBtnClick}/>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    (state) => ({
      BreedManagement      : BreedManagementDuck.selectors.list(state),
      BreedManagementDetail: BreedManagementDetailDuck.selectors.detail(state)

    }),
    {
      getBreedManagement        : BreedManagementDuck.creators.get,
      setItem                   : BreedManagementDetailDuck.creators.setItem,
      setClientPetBreed         : clientPetBreedDetailDuck.creators.setItem,
      setreservationDayBreed    : reservationByDateBreedDetailDuck.creators.setItem,
      setDayCareReservationBreed: dayCareReservationDetailDuck.creators.setItem
    }
  )
)(BreedManagementTable)
