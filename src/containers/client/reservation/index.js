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

import ViewNoteSection from '../../online-request/notesSection/'

import clientDetailDuck from '@reducers/client/detail'
import petDetailDuck from '@reducers/pet/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

import './styles.scss'

function Reservation({ clientDetail, ...props }) {
  const { client: clientId } = useParams()
  const history = useHistory()

  const [ activeReservationItem, setActiveReservationItem ] = useState('Boarding')
  useEffect(() => {
    props.getClient(clientId)
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
              <div className={`button-service ${activeReservationItem === 'Boarding' && 'selected'}`} onClick={_handleReservationTypeClick('Boarding')}>
                <Image avatar src='/images/boarding-icon.svg'/>
                <span>Boarding</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'Training' && 'selected'}`} onClick={_handleReservationTypeClick('Training')}>
                <Image avatar src='/images/training-icon.svg'/>
                <span>Training</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'Fitness' && 'selected'}`} onClick={_handleReservationTypeClick('Fitness')}>
                <Image avatar src='/images/fitness-icon.svg'/>
                <span>Fitness</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'Daycamp' && 'selected'}`} onClick={_handleReservationTypeClick('Daycamp')}>
                <Image avatar src='/images/daycamp-icon.svg'/>
                <span>Daycamp</span>
              </div>
              <div className={`button-service ${activeReservationItem === 'Grooming' && 'selected'}`} onClick={_handleReservationTypeClick('Grooming')}>
                <Image avatar src='/images/grooming-icon.svg'/>
                <span>Grooming</span>
              </div>
            </div>
            {activeReservationItem === 'Boarding' &&  <BoardingReservationFormWizard/>}
            {activeReservationItem === 'Daycamp' &&  <DaycampReservationFormWizard/>}
            {activeReservationItem === 'Fitness' &&  <FitnessReservationFormWizard/>}
            {activeReservationItem === 'Grooming' &&  <GroomingReservationFormWizard/>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }), {
      getClient  : clientDetailDuck.creators.get,
      setItem    : petDetailDuck.creators.setItem,
      setNoteItem: petNoteDetailDuck.creators.setItem
    }
  )
)(Reservation)
