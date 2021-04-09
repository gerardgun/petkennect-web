import React,{ useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Header, Icon, Label, Dropdown, Button, Grid, Container } from 'semantic-ui-react'
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
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 service-heading' color='teal'>Service Tags:</Header>
          <Label
            as='a'
            className='ml0 mr12 ml20'
            size='large' style={{ height: '2.6em', padding: '.78571429em 1.5em .78571429em' }}>
              Leash
              &nbsp;&nbsp;<Icon name='delete'/>
          </Label>
          <Label
            as='a'
            className='ml0'
            size='large' style={{ height: '2.6rem', padding: '.78571429em 1.5em .78571429em' }}>
              Kennel Reactive
              &nbsp;&nbsp;<Icon name='delete'/>
          </Label>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button
            basic className='w120' color='teal'
            onClick={()=>props.setItem(null,'CREATE')}><Icon name='plus'></Icon>Add</Button>
        </Grid.Column>
      </Grid>
      <Grid className='mh0'>
        <Grid.Column computer={11}>
          <Header as='h3' className='mt4 mr20 service-heading' color='teal'>Most Frequently Used Service:</Header>
          <Header as='h3' className='mt4'> Day Camp</Header>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button
            basic className='w120' color='teal'
            content='Rebook' icon='redo alternate' onClick={()=>setRebookAlert(true)}/>
        </Grid.Column>
      </Grid>
      <Grid className='segment-content-header'>
        <Grid.Column computer={3}>
          <Header as='h3' color='teal'>Total Usage:</Header>
          <p className='heading-style heading-margin' color='teal'>Daycamp</p>
          <p className='heading-style column-data'>Fitness</p>
          <p className='heading-style column-data'>Dog Walk</p>
        </Grid.Column>
        <Grid.Column computer={13}>
          <Grid width={16}>
            <Grid.Column className='text-center' computer={8}><b>Prepaids</b></Grid.Column>
            <Grid.Column className='petkennect-profile-body text-center' computer={8}><b>Reservations</b></Grid.Column>
            <Grid.Column className='divider-margin' computer={16}><hr></hr></Grid.Column>
            <Grid.Column computer={8}>
              <Grid.Row >
                <Grid.Column
                  className='text-center-daycamp ml8'
                  computer={4} mobile={16} tablet={8}>
                  <b>Prepaids</b><br/>
                  <p className='mt8'>100</p>
                  <p className='column-data'>100</p>
                  <p className='column-data'>100</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp mh32' computer={6} mobile={16}
                  tablet={8}>
                  <b># Remaining</b><br/>
                  <p className='mt8'>5</p>
                  <p className='column-data'>4</p>
                  <p className='column-data'>3</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={5} mobile={16}
                  tablet={8}>
                  <b>$ Remaining</b><br/>
                  <p className='mt8'>$50.00</p>
                  <p className='column-data'>$50.00</p>
                  <p className='column-data'>$50.00</p>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column className='petkennect-profile-body' computer={8}>
              <Grid.Row >
                <Grid.Column
                  className='text-center-daycamp ml20'
                  computer={4} mobile={16} tablet={8}>
                  <b>Past</b><br/>
                  <p className='mt8'>96</p>
                  <p className='column-data'>90</p>
                  <p className='column-data'>67</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp mh12' computer={4} mobile={16}
                  tablet={8}>
                  <b>Upcoming</b><br/>
                  <p className='mt8'>5</p>
                  <p className='column-data'>4</p>
                  <p className='column-data'>8</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={5} mobile={16}
                  tablet={8}>
                  <b>Canceled</b><br/>
                  <p className='mt8'>0</p>
                  <p className='column-data'>0</p>
                  <p className='column-data'>0</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp ml12' computer={3} mobile={16}
                  tablet={8}>
                  <b>Action</b><br/>
                  <p>
                    <Dropdown
                      className='action-button'
                      direction='left'
                      icon={null}
                      onChange={_handleOptionDropdownChange}
                      options={[ { key: 1, icon: 'file alternate outline' , value: 'recon_report', text: 'Recon Report' },
                        { key: 2, icon: 'eye' ,value: 'view_details', text: 'View Details' } ]}
                      selectOnBlur={false}
                      trigger={(
                        <Button basic icon='ellipsis vertical'/>
                      )}
                      value={null}/></p>
                  <p>
                    <Dropdown
                      className='action-button'
                      direction='left'
                      icon={null}
                      onChange={_handleOptionDropdownChange}
                      options={[ { key: 1, icon: 'file alternate outline' , value: 'recon_report', text: 'Recon Report' },
                        { key: 2, icon: 'eye' ,value: 'view_details', text: 'View Details' } ]}
                      selectOnBlur={false}
                      trigger={(
                        <Button basic icon='ellipsis vertical'/>
                      )}
                      value={null}/></p>
                  <p>
                    <Dropdown
                      className='action-button'
                      direction='left'
                      icon={null}
                      onChange={_handleOptionDropdownChange}
                      options={[ { key: 1, icon: 'file alternate outline' , value: 'recon_report', text: 'Recon Report' },
                        { key: 2, icon: 'eye' ,value: 'view_details', text: 'View Details' } ]}
                      selectOnBlur={false}
                      trigger={(
                        <Button basic icon='ellipsis vertical'/>
                      )}
                      value={null}/></p>
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
          <Header as='h3'  color='teal' >Recent Package Detail</Header>
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
      <div className='training-table'>
        <Table
          config={configPackage}
          duck={dayServicePackageDuck}
          onRowDropdownChange={_handlePackageOptionClick}/>
      </div>

      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={4} mobile={10} tablet={4}>
          <Header as='h2' className='child_header'>Reservations</Header>
        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={12} mobile={10} tablet={12}>
          <Button
            color='teal'
            content='New Reservation'
            icon='add'
            onClick={_handleAddReservationBtnClick}/>
        </Grid.Column>
      </Grid>
      <div className='div-table-width'>
        <Table
          config={config}
          duck={dayCampReservationDuck}
          // onOptionDropdownChange={_handleOptionDropdownChange}
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
      setItemPackage       : dayServicePackageDetailDuck.creators.setItem
    })
)(DaycampServiceSection)

