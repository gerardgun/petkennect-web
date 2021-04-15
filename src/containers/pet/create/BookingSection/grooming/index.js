
import React,{ useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Button, Grid, Container, Label, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { compose } from 'redux'
import groomingReservationConfig from '@lib/constants/list-configs/pet/grooming-reservation'
import groomingPackageConfig from '@lib/constants/list-configs/pet/grooming-package'
import petDetailDuck from '@reducers/pet/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import groomingReservationDuck from '@reducers/pet/reservation/grooming'
import groomingReservationDetailDuck from '@reducers/pet/reservation/grooming/detail'
import groomingPackageDuck from '@reducers/pet/reservation/grooming/package'
import groomingPackageDetailDuck from '@reducers/pet/reservation/grooming/package/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import groomingReservationUsageDuck from '@reducers/pet/reservation/usage/grooming/reservation'
import groomingPrepaidUsageDuck from '@reducers/pet/reservation/usage/grooming/prepaid'
import groomingPrepaidConfig from '@lib/constants/list-configs/reservation/usage/grooming/grooming-prepaid-usage'
import groomingReservationUsageConfig from '@lib/constants/list-configs/reservation/usage/grooming/grooming-reservation-usage'

import './styles.scss'

const Table = loadable(() => import('@components/Table'))
const PetNotes = loadable(() => import('../Notes'))
const PackageCreateForm = loadable(() => import('./package-create'))
const RebookAlert = loadable(() => import('../common-section/rebook-alert'))
const AddServiceTag = loadable(() => import('../common-section/add-service-tag'))
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

const  GroomingServiceSection = ({ comesFromScreen, petDetail,  ...props }) => {
  const [ rebookAlert,setRebookAlert ] = useState(false)
  useEffect(() => {
    props.getgroomingReservation()
    props.getGroomingPackage()
    props.getGroomingPrepaid()
    props.getGroomingReservationUsage()
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
        <Grid.Column computer={4}>
          <Header as='h3' className='mt4 service-heading' color='teal'>Service Tags:</Header>
        </Grid.Column>
        <Grid.Column className='tag-display' computer={8} textAlign='center'>
          <Label
            as='a'
            className='label-style'
            size='medium'>
              No Nails
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
             Muzzle
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          computer={4} mobile={3} tablet={4}>
          <Button
            basic className='w120' color='teal'
            onClick={()=>props.setGroomingReserve(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>

        <Grid.Column computer={12}>
          <Header as='h3' className='mt4 pr8 mr32 service-heading' color='teal'>Last Service:</Header>
          <Header as='h3' className='mt4'>Bath Brush Large Dog</Header>
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
        <Grid.Column computer={12}>
          <Header as='h3' className='mt4 mr32 pr8 service-heading' color='teal'>Preferred Groomer:</Header>
          <Header as='h3' className='mt4'>James Hack</Header>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={16}>
          <Header as='h3' className='t-header total-use' color='teal'>Total Grooming</Header>
        </Grid.Column>
        <Grid.Column className='pr0 flex-container pb0' computer={16}>

          <div>
            <div className='h-container l-header'>

              <Header as='h4'className='mb12' >Prepaids</Header>
            </div>

            <div className='table-left'>
              <Table
                config={groomingPrepaidConfig}
                duck={groomingPrepaidUsageDuck}/>
            </div>

          </div>
          <div>
            <div className='l-header'>
              <Header as='h4' className='mb12' >Reservations</Header>
            </div>

            <div className='table-right'>
              <Table
                config={groomingReservationUsageConfig}
                duck={groomingReservationUsageDuck}/>
            </div>
          </div>

        </Grid.Column>

      </Grid>
      <Grid className='segment-content-header mb0' columns={2}>

        <Grid.Column
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Grooming Packages</Header>
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

        config={groomingPackageConfig}
        duck={groomingPackageDuck} onRowDropdownChange={_handleOptionClick}/>

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
          config={groomingReservationConfig}
          duck={groomingReservationDuck}
          onRowDropdownChange={_handleOptionDropdownChange}/>
      </div>
      <PackageCreateForm/>
      <PetNotes/>
      <AddServiceTag detailDuck={groomingReservationDetailDuck}/>
      <RebookAlert alertStatus={rebookAlert} handleClose={_onHandleRebookAlertClose}/>
      <ModalDelete duckDetail={groomingPackageDetailDuck}/>
      <ModalDelete duckDetail={groomingReservationDetailDuck}/>
    </Container>
  )
}
GroomingServiceSection.defaultProps = {
  comesFromScreen: 'from pet'

}
export default compose(
  connect(
    (state) => ({
      petDetail          : petDetailDuck.selectors.detail(state),
      groomingReservation: groomingReservationDuck.selectors.list(state)
    }),{
      setNoteItem                : petNoteDetailDuck.creators.setItem,
      getgroomingReservation     : groomingReservationDuck.creators.get,
      getGroomingPackage         : groomingPackageDuck.creators.get,
      setGroomingReserve         : groomingReservationDetailDuck.creators.setItem,
      setItemReservation         : petReservationDetailDuck.creators.setItem,
      setItemPackage             : groomingPackageDetailDuck.creators.setItem,
      getGroomingPrepaid         : groomingPrepaidUsageDuck.creators.get,
      getGroomingReservationUsage: groomingReservationUsageDuck.creators.get
    })
)(GroomingServiceSection)

