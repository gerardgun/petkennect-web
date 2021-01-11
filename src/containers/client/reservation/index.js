import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Header, Image, Grid, Button, Icon, Segment, Breadcrumb } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Message from '@components/Message'
import BoardingReservationFormWizard from './boarding'
import DaycampReservationFormWizard from './daycamp'
import FitnessReservationFormWizard from './daycamp'
import GroomingReservationFormWizard from './grooming'
import TrainingReservationFormWizard from './training'

import ViewNoteSection from '../../online-request/notesSection/'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import employeeDetailDuck from '@reducers/employee/detail'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import authDuck from '@reducers/auth'
import locationDuck from '@reducers/location'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import './styles.scss'

function Reservation({ petReservationDetail, currentTenant, clientDetail, ...props }) {
  const { client: clientId } = useParams()
  const history = useHistory()

  const [ activeReservationItem, setActiveReservationItem ] = useState(petReservationDetail.item.service_type || 'B')

  useEffect(() => {
    if(currentTenant && currentTenant.employee)
      props.getEmployee(currentTenant.employee.id)
    props.getClient(clientId)
    props.getLocations()
    props.getClientPets({ client__id: clientId })
    props.getServices()
    props.getServiceAttributes()
  }, [])

  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  const _handleReservationTypeClick = type => () => {
    setActiveReservationItem(type)
  }

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const comesfromScreenName = useMemo(() => Boolean(history.location.state), [])

  return (
    <Layout>
      <Segment className='segment-content petkennect-reservation'>
        <Grid>
          <Grid.Column width={16}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>
                {fullname}
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section>
                New Reservation
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
                  <Header as='h2'>New Reservation</Header>
                </>
              )
            }

            <Message
              content={
                <Grid padded style={{ marginLeft: -16 }}>
                  <Grid.Column className='mb0 pb0' width='16'>
                    <div className='message__title'>Pet vaccinations are out of date</div>
                  </Grid.Column>
                  <Grid.Column width='16'>
                    <Grid>
                      <Grid.Column>
                        <div  className='message__subtitle'>Lala does not have an updated rabias vaccine</div>
                      </Grid.Column>
                    </Grid>

                  </Grid.Column>
                </Grid>

              } type='warning'/>

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

      return {
        petReservationDetail,
        services,
        serviceAttribute,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        clientDetail : clientDetailDuck.selectors.detail(state),
        clientPet    : clientPetDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state)
      }
    },
    {
      getEmployee         : employeeDetailDuck.creators.get,
      getClient           : clientDetailDuck.creators.get,
      getClientPets       : clientPetDuck.creators.get,
      getServices         : serviceDuck.creators.get,
      getServiceAttributes: serviceAttributeDuck.creators.get,
      getLocations        : locationDuck.creators.get,
      setNoteItem         : petNoteDetailDuck.creators.setItem
    }
  )
)(Reservation)
