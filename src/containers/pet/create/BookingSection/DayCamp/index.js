import React,{ useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Icon, Label, Button, Grid, Container } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { compose } from 'redux'

import config from '@lib/constants/list-configs/pet/daycamp-reservation'
import configPackage from '@lib/constants/list-configs/pet/day-service-package'

import petDetailDuck from '@reducers/pet/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import dayCampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'
import dayCampReservationDetailDuck from '@reducers/pet/reservation/daycamp-reservation/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import dayServicePackageDuck from '@reducers/pet/reservation/day-service-package'
import dayServicePackageDetailDuck from '@reducers/pet/reservation/day-service-package/detail'
import daycampReservationUsageDuck from '@reducers/pet/reservation/usage/daycamp/reservation'
import daycampPrepaidUsageDuck from '@reducers/pet/reservation/usage/daycamp/prepaid'
import daycampPrepaidConfig from '@lib/constants/list-configs/reservation/usage/daycamp/daycamp-prepaid-usage'
import daycampReservationConfig from '@lib/constants/list-configs/reservation/usage/daycamp/daycamp-reservation-usage'
import './styles.scss'
const Table = loadable(() => import('@components/Table'))
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetNotes = loadable(() => import('../Notes'))
const PackageCreateForm = loadable(() => import('./package-create'))
const CheckOutAlert = loadable(() => import('../common-section/check-out-alert'))
const RebookAlert = loadable(() => import('../common-section/rebook-alert'))
const AddServiceTag = loadable(() => import('../common-section/add-service-tag'))

function DaycampServiceSection({ comesFromScreen, petDetail,  ...props }) {
  useEffect(() => {
    props.getDayCampReservation()
    props.getDayServicePackage()
    props.getExampleOne()
    props.getExampleTwo()
  }, [])
  const history = useHistory()

  const [ data,setData ] = useState([])
  const [ checkedOut, setCheckedOut ] = useState([])
  const [ checkOutAlert,setCheckOutAlert ] = useState({ status: false, id: '' })
  const [ rebookAlert,setRebookAlert ] = useState(false)

  const { pet: petId } = useParams()
  const { client: client_id } = useParams()
  const clientId = `${petDetail.item.client}`
  const client = petDetail.item &&  petDetail.item.client

  const _handleActionClick = action => {
    if(action === 'new_reservation')
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

  const _handleRowClick = () => {
    // wip
  }
  const _handleRowButtonClick = () => {
    // wip
  }
  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName) {
      case 'edit_reserve' : props.setItemReservation(item,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'add_notes' : props.setNoteItem(item,'READ')
        break

      case 'delete_reservation' : props.setItem(item,'DELETE')
        break
    }
  }

  const _handleAddPackageBtnClick = () =>{
    props.setItemPackage(null, 'CREATE')
  }

  const _handlePackageOptionClick = (option,item) => {
    if(option === 'delete')
      props.setItemPackage(item, 'DELETE')
    else if(option === 'edit_package')
      props.setItemPackage(item, 'UPDATE')
  }

  // const _handleReservation = (value)=>{
  //   if(value.status === 'incomplete')
  //     setData([ ...data,value.id ])

  //   else if(value.status === 'checkIn')
  //     setCheckOutAlert({ status: true, id: value.id })
  // }

  const _onHandleCheckOutClose = (message,id) =>{
    if(message === 'checkout') {
      const filterArray = data.filter(item=>item != id)
      setData(filterArray)
      setCheckedOut([ ...checkedOut,id ])
      setCheckOutAlert({ status: false, id: '' })
    }

    else {
      setCheckOutAlert({ status: false, id: '' })
    }
  }

  const _onHandleRebookAlertClose = ()=>{setRebookAlert(false)}

  return (
    <Container className='c-booking-daycamp' fluid>
      <Grid className='mh0 mt4'>
        <Grid.Column className='pb0 pl0' computer={12}>
          <Header as='h4' className='mr32 mb0 display-inline-block pl0'>Service Tags:</Header>

          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b>Leash</b>
            <Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='label-style'
            size='medium'>
            <b> Kennel Reactive</b>
            <Icon name='delete'/></Label>
        </Grid.Column>

        <Grid.Column
          className='pr0 pl0 pb0'
          computer={4} mobile={3} tablet={4}>
          <Button
            basic
            className='w120' color='teal' floated='right'
            onClick={()=>props.setItem(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>
      <Grid className='mh0 pl0'>
        <Grid.Column className='pl0 pr0' computer={16} verticalAlign='middle'>
          <Header as='h4' className='mr32 mb0 display-inline-block pt7r'>Most Frequently Used Service:</Header>
          <label className='display-inline-block'> Day Camp</label>

          <Button
            basic
            className='w120'
            color='teal' content='Rebook' floated='right'

            icon='redo alternate' onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>
      </Grid>
      <Grid>

        <Grid.Column className='pr0 h-container' computer={9}>
          <Grid>
            <Grid.Column className='pr0 mb5'>
              <Header
                as='h4' className='total-use display-inline-block mb0' color='teal'>Total Usage:</Header>
              <Header as='h4'className='display-inline-block mt0'>Prepaids</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={daycampPrepaidConfig}
            duck={daycampPrepaidUsageDuck}/>

        </Grid.Column>

        <Grid.Column  className='pl0' computer={7}>

          <Grid>
            <Grid.Column className='mb5' textAlign='center'>
              <Header as='h4' className='mt02' >Reservations</Header>
            </Grid.Column>
          </Grid>

          <Table
            config={daycampReservationConfig}
            duck={daycampReservationUsageDuck}/>

        </Grid.Column>
      </Grid>

      <Grid className='segment-content-header mb0' columns={2}>

        <Grid.Column
          className='mt32 pl0'
          computer={6}
          mobile={10} style={{ 'padding-top': '1.4rem' }}
          tablet={4}>
          <Header as='h3'  color='teal' >Recent Package Detail</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align mt32 pr0'
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
      <div className='training-table'>
        <Table
          config={configPackage}
          duck={dayServicePackageDuck}
          onRowDropdownChange={_handlePackageOptionClick}/>
      </div>

      <Grid className='segment-content-header'>
        <Grid.Column
          className='pl0' computer={16} mobile={10}
          tablet={4}>
          <Header as='h3' color='teal'>Reservation History</Header>
        </Grid.Column >
      </Grid>
      <div className='div-table-width'>
        <Table
          config={config}
          duck={dayCampReservationDuck}
          // onOptionDropdownChange={_handleOptionDropdownChange}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}
          onRowClick={_handleRowClick}
          onRowDropdownChange={_handleOptionDropdownChange}/>
      </div>
      <PackageCreateForm/>
      <CheckOutAlert alertStatus={checkOutAlert} handleClose={_onHandleCheckOutClose}/>
      <RebookAlert alertStatus={rebookAlert} handleClose={_onHandleRebookAlertClose}/>
      <AddServiceTag detailDuck={dayCampReservationDetailDuck}/>
      <PetNotes/>
      <ModalDelete duckDetail={dayServicePackageDetailDuck}/>
      <ModalDelete duckDetail={dayCampReservationDetailDuck}/>
    </Container>
  )
}
DaycampServiceSection.defaultProps = {
  comesFromScreen: 'from pet'

}
export default compose(
  connect(
    (state) => ({
      petDetail         : petDetailDuck.selectors.detail(state),
      daycampReservation: dayCampReservationDuck.selectors.list(state),
      dayServicePackage : dayServicePackageDuck.selectors.list(state)
    }),{
      setNoteItem          : petNoteDetailDuck.creators.setItem,
      getDayCampReservation: dayCampReservationDuck.creators.get,
      getDayServicePackage : dayServicePackageDuck.creators.get,
      setItem              : dayCampReservationDetailDuck.creators.setItem,
      setItemReservation   : petReservationDetailDuck.creators.setItem,
      setItemPackage       : dayServicePackageDetailDuck.creators.setItem,
      getExampleOne        : daycampPrepaidUsageDuck.creators.get,
      getExampleTwo        : daycampReservationUsageDuck.creators.get
    })
)(DaycampServiceSection)

