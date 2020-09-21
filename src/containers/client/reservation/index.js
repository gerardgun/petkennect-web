import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Header, Grid, Segment, Breadcrumb } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Message from '@components/Message'
import BoardingReservationFormWizard from './boarding'
import DaycampReservationFormWizard from './daycamp'

import clientDetailDuck from '@reducers/client/detail'
import petDetailDuck from '@reducers/pet/detail'

import './styles.scss'

function Reservation({ clientDetail, ...props }) {
  const { client: clientId } = useParams()
  const [ activeReservationItem, setActiveReservationItem ] = useState('Boarding')
  useEffect(() => {
    props.getClient(clientId)
  }, [])

  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  const _handleReservationTypeClick = (e, { name }) => setActiveReservationItem(name)

  return (
    <Layout>
      <Segment className='segment-content petkennect-reservation'>
        <Grid>
          <Grid.Column className='p40' width={16}>
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
            <Header as='h2'>New Reservation</Header>

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
              <Button
                basic={activeReservationItem !== 'Boarding'} color='gray' content='Boarding'
                icon='circle'
                name='Boarding' onClick={_handleReservationTypeClick}/>
              <Button
                basic={activeReservationItem !== 'Training'} color='gray' content='Training'
                icon='circle' name='Training' onClick={_handleReservationTypeClick}/>
              <Button
                basic={activeReservationItem !== 'Fitness'} color='gray' content='Fitness'
                icon='circle' name='Fitness' onClick={_handleReservationTypeClick}/>
              <Button
                basic={activeReservationItem !== 'Daycamp'} color='gray' content='Daycamp'
                icon='circle' name='Daycamp' onClick={_handleReservationTypeClick}/>
              <Button
                basic={activeReservationItem !== 'Grooming'} color='gray' content='Grooming'
                icon='circle' name='Grooming' onClick={_handleReservationTypeClick}/>
            </div>
            {activeReservationItem === 'Boarding' &&  <BoardingReservationFormWizard/>}
            {activeReservationItem === 'Daycamp' &&  <DaycampReservationFormWizard/>}
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
      getClient: clientDetailDuck.creators.get,
      setItem  : petDetailDuck.creators.setItem
    }
  )
)(Reservation)
