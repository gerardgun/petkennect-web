import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container, Label, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { compose } from 'redux'
import config from '@lib/constants/list-configs/pet/training-reservation'
import trainingPackageConfig from '@lib/constants/list-configs/pet/training-package'
import petDetailDuck from '@reducers/pet/detail'
import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'
import petTrainingReservationDetailDuck from '@reducers/pet/reservation/training/reservation/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petReservationTrainingPackageDetailDuck from '@reducers/pet/reservation/training/package/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import './styles.scss'
const Table = loadable(() => import('@components/Table'))
const PackageCreateForm = loadable(() => import('./package-create'))
const PetNotes = loadable(() => import('../Notes'))
const AddServiceTag = loadable(() => import('../common-section/add-service-tag'))
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

function TrainingServiceSection({ comesFromScreen,petDetail, ...props }) {
  const history = useHistory()

  const { pet: petId } = useParams()
  const { client: client_id } = useParams()

  useEffect(()=> {
    props.getPet(petId)
    props.getPetReservationTraining({ service_type_what_ever_name: 'T' })
  }, [])

  const clientId = `${petDetail.item.client}`
  const client = petDetail.item &&  petDetail.item.client

  const _handleAddReservationBtnClick = () => {
    if(comesFromScreen == 'from pet') {
      props.setReserveItem({ service: 'T' },'CREATE')
      history.push({
        pathname: `/pet/${petId}/book`,
        state   : { option: 'Pet', clientid: client }
      })
    }
    else {
      props.setReserveItem({ service: 'T' },'CREATE')
      history.replace(`/client/${client_id}/book`)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const _handleOptionClick = (option,item)=> {
    if(option === 'delete')
      props.setItem(item, 'DELETE')

    else if(option === 'edit_program')
      props.setItem(item,'UPDATE')
  }

  const _handleActionClick = action=>{
    if(action === 'add_program')
      props.setItem(null, 'CREATE')
  }

  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName) {
      case 'edit_reserve' :  props.setReserveItem(item ,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'edit_note' : props.setNoteItem(item,'READ')
        break

      case 'delete_reservation' : props.setTrainingReserve(item,'DELETE')
        break

      case 'add_note' : props. setNoteItem(null,'CREATE')
        break
    }
  }

  return (
    <Container className='c-booking-daycamp' fluid>
      <Grid className='mh0 mt4'>
        <Grid.Column className='pl0' computer={12}>
          <Header as='h4' className='mr32 mb0 d-inline'>Service Tags:</Header>

          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b>   Remote Collar</b>
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b> Aggressive</b>
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          className='pr0 pl0'
          computer={4} mobile={3} tablet={4}>
          <Button
            basic
            className='w120' color='teal' floated='right'
            onClick={()=>props.setTrainingReserve(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>

      <Grid className='segment-content-header mb0' columns={16}>

        <Grid.Column
          className='mt20 pl0'
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Training Programs</Header>
        </Grid.Column >

      </Grid>
      <div className='mb40 div-table-width'>
        <Table
          config={trainingPackageConfig}
          duck={petTrainingPackageDuck}
          onActionClick={_handleActionClick} onRowDropdownChange={_handleOptionClick}/>
      </div>

      <Grid className='segment-content-header mb0'>
        <Grid.Column
          className='pl0' computer={16} mobile={10}
          style={{ 'padding-top': '15px' }}
          tablet={4}>
          <Header as='h3' color='teal'>Reservation History</Header>
        </Grid.Column >
      </Grid>
      <div className='div-table-width'>
        <Table
          config={config}
          duck={petTrainingReservationDuck}
          onActionClick={_handleAddReservationBtnClick}
          onRowDropdownChange={_handleOptionDropdownChange}/>
      </div>
      <PackageCreateForm/>
      <PetNotes/>
      <AddServiceTag detailDuck={petTrainingReservationDetailDuck}/>
      <ModalDelete duckDetail={petReservationTrainingPackageDetailDuck}/>
      <ModalDelete duckDetail={petTrainingReservationDetailDuck}/>
    </Container>
  )
}

TrainingServiceSection.defaultProps = {
  comesFromScreen: 'from pet'

}

export default compose(
  connect(
    (state) => ({

      petReservation       : petTrainingPackageDuck.selectors.list(state),
      petDetail            : petDetailDuck.selectors.detail(state),
      trainingPackageDetail: petReservationTrainingPackageDetailDuck.selectors.detail(state)
    }),{
      setItem                    : petReservationTrainingPackageDetailDuck.creators.setItem,
      setReserveItem             : petReservationDetailDuck.creators.setItem,
      setTrainingReserve         : petTrainingReservationDetailDuck.creators.setItem,
      getPet                     : petDetailDuck.creators.get,
      getPetReservationTraining  : petTrainingReservationDuck.creators.get,
      setNoteItem                : petNoteDetailDuck.creators.setItem,
      resetPetReservationTraining: petTrainingReservationDetailDuck.creators.setItem

    })
)(TrainingServiceSection)

