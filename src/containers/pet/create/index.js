import React, { useEffect, useState, useRef } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Grid, Segment, Breadcrumb, Image, Label, Menu, Header, Dropdown, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import _get from 'lodash/get'

import Layout from '@components/Common/Layout'
import ImageEditor from '@components/Common/ImageEditor'
import PetProfileProperty from '@components/Common/Pet/Profile/Property'
import FormInformation from './FormInformation'
import BookingSection from './BookingSection'
import VaccinationSection from './VaccinationSection'
import IncidentSection from './IncidentSection'
import NotesSection from './NotesSection'
import GallerySection from './GallerySection'

import petDetailDuck from '@reducers/pet/detail'
import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import useCameraAvailable from '@hooks/useCameraAvailable'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const PetShow = ({ petDetail, ...props }) => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('info')
  const { id } = useParams()

  const inputFileRef = useRef()

  useEffect(() => {
    props.getPet(id)
    props.getPetImages({ pet_id: id })

    return () => {
      props.resetItem()
    }
  }, [])
  const  cameraIsAvailable = useCameraAvailable()

  const getAge = (date) => {
    if(!date) return '-'

    const years = moment().diff(date, 'year')
    const months = moment().diff(date, 'month')
    const days = moment().diff(date, 'day')
    if(years < 0  || months < 0 || days < 0)
      return ' -'

    if(years === 1)
      return `${years} year`

    if(years > 1)
      return `${years} years`

    if(years === 0) {
      if(months === 0)
        return `${days} days`

      if(months === 1)
        return `${months} month`

      if(months > 1)
        return `${months} months`
    }
  }

  const _handleFileChange = e => {
    if(e.target.files && e.target.files[0])
      props.setEditorItem({ filepath: URL.createObjectURL(e.target.files[0]) ,  is_profile: true }, 'EDITOR_CREATE', 'EDITOR')
  }

  const _handleOptionDropdownChange = () => {
    alert('In development...')
  }

  const _handlePhotoAction = (e , data)=>{
    switch (data.value) {
      case 'view_photo':
        props.setEditorItem({ filepath: petDetail.item.image_filepath , is_profile: true }, 'EDITOR_CREATE', 'VIEW')

        return
      case 'take_photo':
        props.setEditorItem({ is_profile: true }, 'EDITOR_CREATE', 'CAMERA')

        return
      case 'upload_photo':
        if(inputFileRef.current)
          inputFileRef.current.click()

        return
      case 'select_photo':
        props.setEditorItem({ is_profile: true }, 'EDITOR_CREATE', 'PICKER')

        return

      default:

        return
    }
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const fullname = `${petDetail.item.name || ''}`
  const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`

  return (
    <Layout>
      <Segment className='segment-content pet-profile'>
        <Grid>
          <Grid.Column className='p40' width={5}>
            <Breadcrumb>
              <Breadcrumb.Section link>
                <Link to='/pet'>Pets</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active link>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>
            <div className='flex justify-center align-center mt40'>
              <Dropdown
                direction='right'
                icon={null}
                onChange={_handlePhotoAction}
                selectOnBlur={false}
                trigger={(
                  <div className='c-image-profile mh-auto'>
                    <Image circular src={petDetail.item.image_filepath || defaultImage}/>
                    <div className='c-image-profile__overlay'>
                      <Icon className='text-white mb8' name='camera'/>
                      <span className='text-regular text-white text-center'>CHANGE <br/>PHOTO</span>
                    </div>

                  </div>
                )}
                value={null}>
                <Dropdown.Menu className='c-image-profile__menu'>
                  {[
                    { key: 'view_photo', value: 'view_photo', text: 'View photo' },
                    { key: 'take_photo', value: 'take_photo', text: 'Take photo'  },
                    { key: 'upload_photo', value: 'upload_photo', text: 'Upload photo' },
                    { key: 'select_photo', value: 'select_photo', text: 'Select photo' }
                  ].filter(_item=> _item.value !== 'take_photo' || (_item.value === 'take_photo' && cameraIsAvailable)).map(_item=> (
                    <Dropdown.Item  key={_item.key} onClick={_handlePhotoAction} value={_item.value}>{_item.text}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <input
              accept='image/*'
              hidden onChange={_handleFileChange} ref={inputFileRef}
              type='file'/>
            <div className='flex justify-between align-center mb24'>
              <div>
                <Header as='h2'>{fullname}</Header>

                {/* Owner data */}
                <div className='flex align-center'>
                  <div className='mr8'>
                    <span style={{ color: '#888888' }}>Owner :</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link className='text-underline' to={`/client/show/${petDetail.item.client}`}>{clientFullName}</Link>
                  </div>
                </div>
              </div>

              <Dropdown
                direction='left'
                icon={null}
                onChange={_handleOptionDropdownChange}
                options={[
                  { key: 1, icon: 'download', value: 'download-profile', text: 'Download Profile' },
                  { key: 2, icon: 'paper plane outline', value: 'send-email', text: 'Send Email' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button basic icon='ellipsis vertical'/>
                )}
                value={null}/>

            </div>

            <Grid>
              <Grid.Row columns={2} verticalAlign='middle'>
                <Grid.Column>
                  <PetProfileProperty name='Breed&nbsp;' value={_get(petDetail.item, 'breed_name', '-')}/>
                </Grid.Column>
                <Grid.Column>
                  <PetProfileProperty name='Age&nbsp;&nbsp;&nbsp;&nbsp;' value={getAge(petDetail.item.born_at)}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} style={{ paddingTop: 0 }} verticalAlign='middle'>
                <Grid.Column>
                  <PetProfileProperty name='Sex&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' value={petDetail.item.sex === 'F' ? 'Female' : 'Male'}/>
                </Grid.Column>
                <Grid.Column>
                  <PetProfileProperty name='Fixed&nbsp;' value={petDetail.item.fixed ? 'Yes' : 'No'}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <br/>

            <Menu
              className='pet-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'} link name='info'
                onClick={_handleMenuItemClick}>
                Pet Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'bookings'} link name='bookings'
                onClick={_handleMenuItemClick}>
                Bookings
                <Label color='teal'>4</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'vaccinations'} link name='vaccinations'
                onClick={_handleMenuItemClick}>
                Vaccinations
                <Icon color='orange' name='warning circle' size='large'/>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'incidents'} link name='incidents'
                onClick={_handleMenuItemClick}>
                Incidents
                <Icon color='orange' name='warning circle' size='large'/>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'notes'} link name='notes'
                onClick={_handleMenuItemClick}>
                Notes
                <Label color='teal'>3</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'gallery'} link name='gallery'
                onClick={_handleMenuItemClick}>
                Gallery
                <Label color='teal'>58</Label>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column className='shadow-2 p0' width={11}>
            {activeMenuItem === 'info' && <FormInformation/>}
            {activeMenuItem === 'bookings' && <BookingSection/>}
            {activeMenuItem === 'vaccinations' && <VaccinationSection/>}
            {activeMenuItem === 'incidents' && <IncidentSection/>}
            {activeMenuItem === 'notes' && <NotesSection/>}
            {activeMenuItem === 'gallery' && <GallerySection/>}
          </Grid.Column>

          <ImageEditor
            circularCropper
            duck={petImageDuck}
            duckDetail={petImageDetailDuck}/>

        </Grid>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      petDetail: petDetailDuck.selectors.detail(state),
      petImage : petImageDuck.selectors.list(state)

    }), {
      getPetImages : petImageDuck.creators.get,
      getPet       : petDetailDuck.creators.get,
      postPetImage : petImageDetailDuck.creators.post,
      putPetImage  : petImageDetailDuck.creators.put,
      resetItem    : petDetailDuck.creators.resetItem,
      setEditorItem: petImageDetailDuck.creators.setEditorItem
    })
)(PetShow)
