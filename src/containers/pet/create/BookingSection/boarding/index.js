
import React,{ useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container, Label, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { compose } from 'redux'
import boardingReservationListConfig from '@lib/constants/list-configs/pet/boarding-reservation'
import petReservationBoardingDuck from '@reducers/pet/reservation/boarding'
import petReservationBoardingDetailDuck from '@reducers/pet/reservation/boarding/detail'
import boardingPackageConfig from '@lib/constants/list-configs/pet/boarding-package'
import petDetailDuck from '@reducers/pet/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import boardingPackageDuck from '@reducers/pet/reservation/boarding/package'
import boardingPackageDetailDuck from '@reducers/pet/reservation/boarding/package/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import boardingReservationUsageDuck from '@reducers/pet/reservation/usage/boarding/reservation'
import boardingPrepaidUsageDuck from '@reducers/pet/reservation/usage/boarding/prepaid'
import boardingPrepaidConfig from '@lib/constants/list-configs/reservation/usage/boarding/boarding-prepaid-usage'
import boardingReservationConfig from '@lib/constants/list-configs/reservation/usage/boarding/boarding-reservation-usage'

import  './styles.scss'

const Table = loadable(() => import('@components/Table'))
const PetNotes = loadable(() => import('../Notes'))
// const PackageCreateForm = loadable(() => import('./package-create'))
const RebookAlert = loadable(() => import('../common-section/rebook-alert'))
const AddServiceTag = loadable(() => import('../common-section/add-service-tag'))
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

const  BoardingServiceSection = ({ comesFromScreen, petDetail,  ...props }) => {
  const [ rebookAlert,setRebookAlert ] = useState(false)
  useEffect(() => {
    props.getboardingReservation()
    props.getGroomingPackage()
    props.getBoardingPrepaid()
    props.getBoardingReservation()
  }, [])
  const history = useHistory()

  const { pet: petId } = useParams()
  const { client: client_id } = useParams()
  const clientId = `${petDetail.item.client}`
  const client = petDetail.item &&  petDetail.item.client

  const _handleAddPackageBtnClick = () =>{
    props.setItemPackage(null, 'CREATE')
  }

  const _handleAddReservationBtnClick = () => {
    if(comesFromScreen == 'from pet') {
      props.setItemReservation({ service: 'D' },'CREATE')
      history.push({
        pathname: `/pet/${petId}/book`,
        state   : { option: 'Pet', clientid: client }
      })
    }
    else {
      props.setItemReservation({ service: 'D' },'CREATE')
      history.replace(`/client/${client_id}/book`)
    }
  }

  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName) {
      case 'edit_reserve' : props.setItemReservation(item,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break
      case 'edit_note' : props.setNoteItem(item,'READ')
        break
      case 'delete_reservation' : props.setBoardingReserve(item,'DELETE')
        break
      case 'add_note' : props. setNoteItem(null,'CREATE')
        break
    }
  }

  const _handleOptionClick = (option,item)=> {
    if(option === 'delete')
      props.setItemPackage(item, 'DELETE')
    else if(option === 'edit_package')
      props.setItemPackage(item,'UPDATE')
  }

  const _onHandleRebookAlertClose = ()=>{setRebookAlert(false)}

  return (
    <Container className='c-booking-daycamp' fluid>
      <Grid className='mh0 mt4'>
        <Grid.Column computer={4}>
          <Header as='h3' className='mt4 service-heading' color='teal'>Service Tags:</Header>
        </Grid.Column>
        <Grid.Column className='tag-display' computer={8} textAlign='center'>
          <Label
            as='a'
            className='label-style'
            size='medium'>
              Reactive
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
              No Blanket
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          computer={4} mobile={3} tablet={4}>
          <Button
            basic className='w120' color='teal'
            onClick={()=>props.setBoardingReserve(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>
        <Grid.Column computer={12}>
          <Header as='h3' className='mt4 mr32 service-heading' color='teal'>Most Frequently Used Service:</Header>
          <Header as='h3' className='mt4'> Day Camp</Header>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button
            basic className='w120' color='teal'
            content='Rebook' icon='redo alternate' onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>

        <Grid.Column computer={12}>
          <Header as='h3' className='mt4 pr8 mr32 service-heading' color='teal'>Last Service:</Header>
          <Header as='h3' className='mt4'>Boarding + Day Camp</Header>
        </Grid.Column>

        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button
            basic
            className='w120'
            color='teal' content='Rebook' icon='redo alternate'
            onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 mr32 pr8 service-heading' color='teal'>Day Activity Package:</Header>
          <Header as='h3' className='mt4'></Header>
        </Grid.Column>
      </Grid>

      <Grid className='mh0'>
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 mr32 pr8 service-heading' color='teal'>Add On Services:</Header>
          <Header as='h3' className='mt4'>Grooming, Treat</Header>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={16}>
          <Header as='h3' className='t-header total-use' color='teal'>Total Boarding</Header>
        </Grid.Column>
        <Grid.Column className='pr0 flex-container pb0' computer={16}>

          <div>
            <div className='h-container l-header'>

              <Header as='h4'className='mb12' >Prepaids</Header>
            </div>

            <div className='table-left'>
              <Table
                config={boardingPrepaidConfig}
                duck={boardingPrepaidUsageDuck}/>
            </div>

          </div>
          <div>
            <div className='l-header'>
              <Header as='h4' className='mb12' >Reservations</Header>
            </div>

            <div className='table-right'>
              <Table
                config={boardingReservationConfig}
                duck={boardingReservationUsageDuck}/>
            </div>
          </div>

          {/* </div> */}

        </Grid.Column>

      </Grid>

      <Grid className='segment-content-header mb0' columns={2}>

        <Grid.Column
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Boarding Packages</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={10} mobile={10} tablet={12}>
          <Button
            basic
            color='teal'
            content='View All'/>
          <Button
            color='teal'
            content='Add Package'
            icon='add'
            onClick={_handleAddPackageBtnClick}/>
        </Grid.Column>
      </Grid>
      <Table

        config={boardingPackageConfig}
        duck={boardingPackageDuck} onRowDropdownChange={_handleOptionClick}/>

      <Grid className='segment-content-header mb0' columns={2}>
        <Grid.Column
          computer={10} mobile={10} style={{ 'padding-top': '15px' }}
          tablet={4}>
          <Header as='h3' color='teal'>Reservation History</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={6} mobile={10} tablet={12}>
          <Button
            color='teal'
            content='Add Reservation'
            icon='add'
            onClick={_handleAddReservationBtnClick}/>
        </Grid.Column>
      </Grid>
      <div className='div-table-width'>
        <Table
          config={boardingReservationListConfig}
          duck={petReservationBoardingDuck}
          onRowDropdownChange={_handleOptionDropdownChange}/>
      </div>
      {/* <PackageCreateForm/> */}
      <PetNotes/>
      <AddServiceTag detailDuck={petReservationBoardingDetailDuck}/>
      <RebookAlert alertStatus={rebookAlert} handleClose={_onHandleRebookAlertClose}/>
      <ModalDelete duckDetail={boardingPackageDetailDuck}/>
      <ModalDelete duckDetail={petReservationBoardingDetailDuck}/>
    </Container>
  )
}
BoardingServiceSection.defaultProps = {
  comesFromScreen: 'from pet'

}
export default compose(
  connect(
    (state) => ({
      petDetail          : petDetailDuck.selectors.detail(state),
      boardingReservation: petReservationBoardingDuck.selectors.list(state)
    }),{
      setNoteItem           : petNoteDetailDuck.creators.setItem,
      getboardingReservation: petReservationBoardingDuck.creators.get,
      getGroomingPackage    : boardingPackageDuck.creators.get,
      setBoardingReserve    : petReservationBoardingDetailDuck.creators.setItem,
      setItemReservation    : petReservationDetailDuck.creators.setItem,
      setItemPackage        : boardingPackageDetailDuck.creators.setItem,
      getBoardingPrepaid    : boardingPrepaidUsageDuck.creators.get,
      getBoardingReservation: boardingReservationUsageDuck.creators.get

    })
)(BoardingServiceSection)

