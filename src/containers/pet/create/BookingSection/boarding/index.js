
import React,{ useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container, Label, Icon, Divider } from 'semantic-ui-react'
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
      props.setItemReservation({ service: 'B' },'CREATE')
      history.push({
        pathname: `/pet/${petId}/book`,
        state   : { option: 'Pet', clientid: client }
      })
    }
    else {
      props.setItemReservation({ service: 'B' },'CREATE')
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
        <Grid.Column className='pl0 pb0 pt0' computer={12}>
          <Header as='h4' className='mr32 mb0 display-inline-block'>Service Tags</Header>

          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b>Reactive</b>
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b>No Blanket</b>
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          className='pr0 pb0 pt0'
          computer={4} mobile={3} tablet={4}>
          <Button
            basic
            className='w120'
            color='teal'
            content='Tags' floated='right' icon='add'
            onClick={()=>props.setBoardingReserve(null,'CREATE')}/>
        </Grid.Column>
      </Grid>

      <Grid className='mh0'>

        <Grid.Column className='pl0 pr0 pb3 pt8' computer={16} verticalAlign='middle'>
          <Header as='h4' className='mr32 mb0 display-inline-block pt7r'>Last Service</Header>
          <label className='display-inline-block'>Boarding + Day Camp</label>

          <Button
            basic
            className='w120'
            color='teal'
            content='Rebook' floated='right' icon='redo alternate'
            onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>

      </Grid>
      <Grid className='mh0'>
        <Grid.Column className='pl0 pr0 pb3 pt12' computer={16} verticalAlign='middle'>
          <Header as='h4' className='mr32 pr8'>Day Activity Package</Header>

        </Grid.Column>
      </Grid>

      <Grid className='mh0'>
        <Grid.Column className='pl0 pr0 pt12 pb24' computer={16} verticalAlign='middle'>
          <Header as='h4'  className='mr32 mb0 display-inline-block pt7r'>Add On Services</Header>

          <label className='display-inline-block'>Grooming, Treat</label>
        </Grid.Column>
      </Grid>
      <Divider className='mb24'/>
      <Grid>
        <Grid.Column className='pb0' computer={16}>
          <Header as='h4' className='pl0' color='teal'>Total Boarding</Header>
        </Grid.Column>
        <Grid.Column className='pr0 h-container boarding-table' computer={8}>

          <Grid>
            <Grid.Column className='mb5' textAlign='center'>
              <Header as='h4' className='mt02' >Prepaids</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={boardingPrepaidConfig}
            duck={boardingPrepaidUsageDuck}/>

        </Grid.Column>

        <Grid.Column  className='pl0 boarding-table' computer={8}>

          <Grid>
            <Grid.Column className='mb5' textAlign='center'>
              <Header as='h4' className='mt02' >Reservations</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={boardingReservationConfig}
            duck={boardingReservationUsageDuck}/>

        </Grid.Column>
      </Grid>

      <Grid className='mb0 mt32' columns={2}>

        <Grid.Column
          className='pb8'
          computer={6}
          mobile={10}
          style={{ 'padding-top': '1.4rem' }} tablet={4}
          verticalAlign='middle'>
          <Header as='h4'  color='teal' >Boarding Packages</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align pb8'
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
          className='pl0 pb0'
          computer={16} mobile={10} style={{ 'padding-top': '15px' }}
          tablet={4}>
          <Header as='h4' color='teal'>Reservation History</Header>
        </Grid.Column >

      </Grid>
      <Grid>
        <Grid.Column className='pt0' computer={16}>
          <Table
            config={boardingReservationListConfig}
            duck={petReservationBoardingDuck}
            onActionClick={_handleAddReservationBtnClick}
            onRowDropdownChange={_handleOptionDropdownChange}/>
        </Grid.Column>
      </Grid>

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

