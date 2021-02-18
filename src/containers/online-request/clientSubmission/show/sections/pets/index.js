import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header, Menu, Select, Segment, Grid, Image } from 'semantic-ui-react'

import InformationSection from './sections/information'
import VaccinationSection from './sections/vaccinations'
import { defaultImageUrl } from '@lib/constants'

import clientPetDuck from '@reducers/client/pet'
import petDetailDuck from '@reducers/pet/detail'

const ClientSubmissionPetList = props => {
  const {
    clientPet,
    petDetail
  } = props

  useEffect(() => {
    if(clientPet.status === 'GOT' && !petDetail.item.id)
      props.getPet(clientPet.items[0].id)
  }, [ clientPet.status ])

  const [ activeMenuItem, setActiveMenuItem ] = useState('info')

  const _handlePetDropdownChange = (e, { value }) => {
    props.getPet(value)
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <>
      <Select
        autoFocus
        control={Select}
        onChange={_handlePetDropdownChange}
        options={
          clientPet.items.map(item => ({
            key  : item.id,
            value: item.id,
            text : item.name
          }))
        }
        placeholder='Choose the dog'
        selectOnBlur={false}
        value={petDetail.item.id}/>

      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar'
            computer={5} mobile={16} tablet={16}>

            <div className='flex justify-center align-center mt40'>
              <div className='c-image-profile'>
                <Image circular src={petDetail.item.image_filepath || defaultImageUrl}/>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Header as='h2'>{petDetail.item.name}</Header>
            </div>

            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'} link name='info'
                onClick={_handleMenuItemClick}>
                Pet Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'vaccinations'} link name='vaccinations'
                onClick={_handleMenuItemClick}>
                Vaccinations
                {/* <Label color='teal'>{12}</Label> */}
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={16}>
            {activeMenuItem === 'info' && <InformationSection/>}
            {activeMenuItem === 'vaccinations' && <VaccinationSection/>}
          </Grid.Column>
        </Grid>
      </Segment>

    </>
  )
}

export default compose(
  connect(
    state  => {
      const clientPet = clientPetDuck.selectors.list(state)

      return {
        clientPet,
        petDetail: petDetailDuck.selectors.detail(state)
      }
    },
    {
      getPet: petDetailDuck.creators.get
    }
  )
)(ClientSubmissionPetList)
