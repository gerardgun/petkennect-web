import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Header, Image, Grid, Button, Icon, Segment, Breadcrumb } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import BoardingReservationFormWizard from './boarding'
import DaycampReservationFormWizard from './daycamp'
import FitnessReservationFormWizard from './daycamp'
import GroomingReservationFormWizard from './grooming'
import TrainingReservationFormWizard from './training'
import ViewNoteSection from '../../online-request/notesSection/'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'
import trainingMethodDuck from '@reducers/training-method'
import trainingReasonDuck from '@reducers/training-reason'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import authDuck from '@reducers/auth'
import locationDuck from '@reducers/location'
import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import './styles.scss'

function Reservation({ petReservationDetail, currentTenant, clientDetail,clientPet , ...props }) {
  const history = useHistory()
  const { client: client } = useParams()
  const { pet: pet } = useParams()
  let clientId
  const comesFromPetScreen = useMemo(() => Boolean(history.location.state), [])

  if(comesFromPetScreen)
    clientId  = history.location.state.clientid

  else
    clientId = client
  const [ activeReservationItem, setActiveReservationItem ] = useState(petReservationDetail.item.service || petReservationDetail.item.service_type || 'B')
  useEffect(() => {
    if(currentTenant && currentTenant.employee)
      props.getEmployee(currentTenant.employee.id)
    props.getClient(clientId)
    props.getLocations()
    props.getClientPets({ client__id: clientId })
    props.getServices()
    props.getServiceAttributes()
    props.getPetKennelType()
    props.getEmployees()
    props.getTrainingMethod()
    props.getTrainingReason()
  }, [])
  let petInfo
  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  petInfo = comesFromPetScreen &&  clientPet.items.find(_item=>_item.id == pet)
  const petFullName =  petInfo != undefined ? petInfo.name : ''
  const _handleReservationTypeClick = type => () => {
    props.resetReserveItem()
    if(!isUpdating)
      setActiveReservationItem(type)
  }

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const isUpdating = Boolean(petReservationDetail.item.id)

  const comesfromScreenName = useMemo(() => Boolean(history.location.state), [])

  return (
    <Layout>
      <Segment className='segment-content petkennect-reservation'>
        <Grid>
          <Grid.Column width={16}>
            <Breadcrumb>
              <Breadcrumb.Section>
                {comesFromPetScreen
                  ? <Link to='/pet'>Pets</Link>
                  : <Link to='/client'>Clients</Link>}
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>{
                comesFromPetScreen

                  ? <Breadcrumb.Section active>
                    <Link to={`/pet/${pet}`}> {petFullName} </Link>

                  </Breadcrumb.Section>

                  : <Breadcrumb.Section active>
                    <Link to={`/client/${clientId}`}> {fullname} </Link>
                  </Breadcrumb.Section>
              }

              <Breadcrumb.Divider/>
              <Breadcrumb.Section>
                {petReservationDetail.item.service_type ? 'Update ' : 'New '}Reservation
              </Breadcrumb.Section>
            </Breadcrumb>
            {
              comesfromScreenName  ? (
                history.location.state && history.location.state.redirect_page_name === 'confirm_reservation' && (
                  <>
                    <Header as='h2'>Review Reservation</Header>

                    <Button
                      basic color='teal' icon='plus'
                      onClick={_handleAddNoteBtnClick}>
                      <Icon name='plus'/> Add Note
                    </Button>
                    <ViewNoteSection/>
                  </>
                )
              ) : (
                <>
                  <Header as='h2'>{petReservationDetail.item.service_type ? 'Update ' : 'New '}Reservation</Header>
                </>
              )
            }

            <Header as='h3'>What is the Service?</Header>
            <div className='mv32 btn-service-type'>
              <div className={`button-service ${activeReservationItem === 'B' && 'selected'}`} onClick={_handleReservationTypeClick('B')}>
                <Image avatar src='/images/boarding-icon.svg'/>
                <span>Boarding</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'T' && 'selected'}`} onClick={_handleReservationTypeClick('T')}>
                <Image avatar src='/images/training-icon.svg'/>
                <span>Training</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'F' && 'selected'}`} onClick={_handleReservationTypeClick('F')}>
                <Image avatar src='/images/fitness-icon.svg'/>
                <span>Day Services</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'D' && 'selected'}`} onClick={_handleReservationTypeClick('D')}>
                <Image avatar src='/images/daycamp-icon.svg'/>
                <span>Daycamp</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'G' && 'selected'}`} onClick={_handleReservationTypeClick('G')}>
                <Image avatar src='/images/grooming-icon.svg'/>
                <span>Grooming</span>
              </div>
            </div>
            {activeReservationItem === 'B' &&  <BoardingReservationFormWizard serviceType={activeReservationItem}/>}
            {activeReservationItem === 'D' &&  <DaycampReservationFormWizard serviceType={activeReservationItem}/>}
            {activeReservationItem === 'F' &&  <FitnessReservationFormWizard serviceType={activeReservationItem}/>}
            {activeReservationItem === 'G' &&  <GroomingReservationFormWizard serviceType={activeReservationItem}/>}
            {activeReservationItem === 'T' &&  <TrainingReservationFormWizard serviceType={activeReservationItem}/>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const services = serviceDuck.selectors.list(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const petKennelType = petKennelTypeDuck.selectors.list(state)
      const employees = employeeDuck.selectors.list(state)
      const trainingMethod = trainingMethodDuck.selectors.list(state)
      const trainingReason = trainingReasonDuck.selectors.list(state)

      return {
        petReservationDetail,
        services,
        serviceAttribute,
        petKennelType,
        employees,
        trainingMethod,
        trainingReason,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        clientDetail : clientDetailDuck.selectors.detail(state),
        clientPet    : clientPetDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state)
      }
    },
    {
      getEmployee         : employeeDetailDuck.creators.get,
      getEmployees        : employeeDuck.creators.get,
      getClient           : clientDetailDuck.creators.get,
      getClientPets       : clientPetDuck.creators.get,
      getServices         : serviceDuck.creators.get,
      getServiceAttributes: serviceAttributeDuck.creators.get,
      getLocations        : locationDuck.creators.get,
      getPetKennelType    : petKennelTypeDuck.creators.get,
      getTrainingMethod   : trainingMethodDuck.creators.get,
      getTrainingReason   : trainingReasonDuck.creators.get,
      setNoteItem         : petNoteDetailDuck.creators.setItem,
      resetReserveItem    : petReservationDetailDuck.creators.resetItem
    }
  )
)(Reservation)
