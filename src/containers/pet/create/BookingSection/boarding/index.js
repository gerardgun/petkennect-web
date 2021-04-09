
import React,{ useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container, Label, Icon, Dropdown  } from 'semantic-ui-react'
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
      case 'delete_reservation' : props.setGroomingReserve(item,'DELETE')
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
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 service-heading' color='teal'>Service Tags:</Header>
          <Label
            as='a'
            className='mr12 ml20'
            size='large' style={{ height: '2.6rem', padding: '.78571429em 1.5em .78571429em' }}>
              Kennel Reactive
              &nbsp;&nbsp;<Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='ml0'
            size='large' style={{ height: '2.6rem', padding: '.78571429em 1.5em .78571429em' }}>
              No Blanket
              &nbsp;&nbsp;<Icon name='delete'/>
          </Label>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button
            basic
            className='w120'
            color='teal' content='Add' icon='add'
            onClick={()=>props.setGroomingReserve(null,'CREATE')}/>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>

        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 pr8 mr20 service-heading' color='teal'>Last Service:</Header>
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
          <Header as='h3' className='mt4 mr20 pr8 service-heading' color='teal'>Day Activity Package:</Header>
          <Header as='h3' className='mt4'></Header>
        </Grid.Column>
      </Grid>

      <Grid className='mh0'>
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 mr20 pr8 service-heading' color='teal'>Add On Services:</Header>
          <Header as='h3' className='mt4'>Grooming, Treat</Header>
        </Grid.Column>
      </Grid>
      <Grid className='segment-content-header mt32'>
        <Grid.Column className='pr0' computer={4}>
          <Header as='h3' color='teal'>Total Boarding:</Header>
        </Grid.Column>
        <Grid.Column computer={12}>
          <Grid width={16}>
            <Grid.Column className='text-center' computer={8}><Header  content='Prepaids'/></Grid.Column>
            <Grid.Column className='petkennect-profile-body text-center' computer={8}><Header  content='Reservations'/></Grid.Column>
            <Grid.Column className='divider-margin' computer={16}><hr></hr></Grid.Column>
            <Grid.Column  className='pl16 pr4'computer={8}>
              <Grid.Row >
                <Grid.Column
                  className='text-center-daycamp'
                  computer={4} mobile={16} tablet={8}>
                  <b>Prepaids</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='25'/>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp mh20' computer={6} mobile={16}
                  tablet={8}>
                  <b># Remaining</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='10'/>

                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={5} mobile={16}
                  tablet={8}>
                  <b> $ Remaining</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='$50.00'/>

                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column className='petkennect-profile-body pr0' computer={8}>
              <Grid.Row >
                <Grid.Column
                  className='text-center-daycamp ml12'
                  computer={4} mobile={16} tablet={8}>
                  <b>Past</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='15'/>

                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp mh12' computer={4} mobile={16}
                  tablet={8}>
                  <b>Upcoming</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='7'/>

                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={5} mobile={16}
                  tablet={8}>
                  <b>Canceled</b><br/>
                  <Header
                    as='h4' className='mt8' color='teal'
                    content='0'/>

                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp ml12' computer={3} mobile={16}
                  tablet={8}>
                  <b>Action</b><br/>
                  {/* <p className='mt8'><Button basic className='action-button' icon='ellipsis vertical'/></p> */}
                  <Dropdown
                    direction='left'
                    icon={null}
                    options={[ { key: 1, icon: 'file alternate outline' , value: 'recon_report', text: 'Recon Report' },
                      { key: 2, icon: 'eye' ,value: 'view_details', text: 'View Details' } ]}
                    selectOnBlur={false}
                    trigger={(
                      <Button basic className='action-button mt8' icon='ellipsis vertical'/>
                    )}
                    value={null}/>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <Grid className='segment-content-header mb0' columns={2}>

        <Grid.Column
          className='mt32'
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Boarding Packages</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align mt32'
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
      setGroomingReserve    : petReservationBoardingDetailDuck.creators.setItem,
      setItemReservation    : petReservationDetailDuck.creators.setItem,
      setItemPackage        : boardingPackageDetailDuck.creators.setItem
    })
)(BoardingServiceSection)

