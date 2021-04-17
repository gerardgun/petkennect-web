
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
      props.setItemReservation({ service: 'G' },'CREATE')
      history.push({
        pathname: `/pet/${petId}/book`,
        state   : { option: 'Pet', clientid: client }
      })
    }
    else {
      props.setItemReservation({ service: 'G' },'CREATE')
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
        <Grid.Column className='pl0 pb0' computer={12}>
          <Header as='h4' className='mr32 mb0 display-inline-block'>Service Tags:</Header>

          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b> No Nails</b>
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b> Muzzle</b>
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          className='pr0 pb0'
          computer={4} mobile={3} tablet={4}>
          <Button
            basic
            className='w120' color='teal' floated='right'
            onClick={()=>props.setGroomingReserve(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>

      <Grid className='mh0'>
        <Grid.Column className='pl0 pr0 pb0' computer={16} verticalAlign='middle'>
          <Header as='h4' className='mr32 mb0 display-inline-block pt7r'>Last Service:</Header>
          <label className='display-inline-block'> Bath Brush Large Dog</label>

          <Button
            basic
            className='w120'
            color='teal' content='Rebook' floated='right'

            icon='redo alternate' onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>
      </Grid>
      <Grid className='mh0 pb0'>
        <Grid.Column className='pl0 pr0' computer={16} verticalAlign='middle'>
          <Header as='h4'  className='mr32 mb0 display-inline-block pt7r'>Preferred Groomer:</Header>

          <label className='display-inline-block'>James Hack</label>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column computer={16}>
          <Header as='h3' className='pl0' color='teal'>Total Grooming</Header>
        </Grid.Column>
        <Grid.Column className='pr0 h-container' computer={8}>

          <Grid>
            <Grid.Column className='mb5' textAlign='center'>
              <Header as='h4' className='mt02' >Prepaids</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={groomingPrepaidConfig}
            duck={groomingPrepaidUsageDuck}/>

        </Grid.Column>

        <Grid.Column  className='pl0' computer={8}>

          <Grid>
            <Grid.Column className='mb5' textAlign='center'>
              <Header as='h4' className='mt02' >Reservations</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={groomingReservationUsageConfig}
            duck={groomingReservationUsageDuck}/>

        </Grid.Column>
      </Grid>

      <Grid className='segment-content-header mb0 mt32' columns={2}>

        <Grid.Column
          className='pl0'
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Grooming Packages</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align pr0'
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
          className='pl0'
          computer={16} mobile={10} style={{ 'padding-top': '15px' }}
          tablet={4}>
          <Header as='h3' color='teal'>Reservation History</Header>
        </Grid.Column >

      </Grid>
      <div className='div-table-width'>
        <Table
          config={groomingReservationConfig}
          duck={groomingReservationDuck}
          onActionClick={_handleAddReservationBtnClick}
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

