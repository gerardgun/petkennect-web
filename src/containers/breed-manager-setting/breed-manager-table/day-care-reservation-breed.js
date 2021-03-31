import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {  Header, Modal, Grid } from 'semantic-ui-react'
import loadable from '@loadable/component'
import useModal from '@components/Modal/useModal'
import ModalDelete from '@components/Modal/Delete'
import reservationByDateBreedListConfig from '@lib/constants/list-configs/pet/breed-manager-setting/day-care-reservation-breed'

import reservationByDateBreedDuck from '@reducers/pet/breed-manager-setting/day-care-reservation-breed'
import reservationByDateBreedDetailDuck from '@reducers/pet/breed-manager-setting/day-care-reservation-breed/detail'

const Table = loadable(() => import('@components/Table'))

const DayCareReservationBreed = (props) => {
  const {
    dayCarereservationDetail
  } = props
  const [ open, { _handleClose_ } ] = useModal()
  useEffect(() => {
    props.getclientPet()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(dayCarereservationDetail.mode), [
    dayCarereservationDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}

        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={16} mobile={10} tablet={4}>
            <Header as='h2' color='teal'>Standing Day Care Reservation for Selected Breeds</Header>
          </Grid.Column >

        </Grid>
        <div className='table-row-padding'>
          <Table config={reservationByDateBreedListConfig} duck={reservationByDateBreedDuck}/>
        </div>

        <ModalDelete
          duckDetail={reservationByDateBreedDuck}
          onClose={_handleClose_}
          open={open}/>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const dayCarereservationDetail = reservationByDateBreedDetailDuck .selectors.detail(state)

      return {

        dayCarereservationDetail,
        initialValues: { ...dayCarereservationDetail.item }
      }
    },
    {  getclientPet      : reservationByDateBreedDuck.creators.get,
      post              : reservationByDateBreedDetailDuck .creators.post,
      put               : reservationByDateBreedDetailDuck .creators.put,
      resetItem         : reservationByDateBreedDetailDuck .creators.resetItem,
      getBreedingDetails: reservationByDateBreedDetailDuck .creators.get,
      setItem           : reservationByDateBreedDetailDuck .creators.setItem
    }
  )
)(DayCareReservationBreed)
