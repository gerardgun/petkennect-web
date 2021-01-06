import React, { useEffect, useMemo, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Grid, Segment, Breadcrumb, Image, Label, Menu, Header, Dropdown, Button, Icon } from 'semantic-ui-react'
import _get from 'lodash/get'

import Layout from '@components/Common/Layout'
import ImageEditor from '@components/Common/ImageEditor'
import PetProfileProperty from '@components/Common/Pet/Profile/Property'
import InformationSection from './InformationSection'
import BookingSection from './BookingSection'
import VaccinationSection from './VaccinationSection'
import IncidentSection from './IncidentSection'
import NoteSection from './NoteSection'
import GallerySection from './GallerySection'
import TrainingPerformance from './BookingSection/Training/Performance'

import useCameraAvailable from '@hooks/useCameraAvailable'
import { defaultImageUrl } from '@lib/constants'
import { getAge } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'
import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import petNoteDuck from '@reducers/pet/note'
import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'

const PetShow = ({ petDetail, trainingPackageDetail, petImage, petNote, ...props }) => {
  const history = useHistory()

  const [ activeMenuItem, setActiveMenuItem ] = useState('info')
  const inputFileRef = useRef()
  const { pet: petId } = useParams()
  const cameraIsAvailable = useCameraAvailable()

  useEffect(() => {
    props.getPet(petId)
    props.getPetImages({ pet_id: petId })
    props.getPetRetireReasons()
    props.getPetNotes({ pet_id: petId, ordering: '-created_at' })
    if(history.location.state !== undefined)
      if(history.location.state.option === 'vaccination')
        setActiveMenuItem('vaccinations')
      else if(history.location.state.option === 'services')
        setActiveMenuItem('bookings')

    return () => {
      props.resetItem()
    }
  }, [])

  useEffect(() => {
    if(petDetail.status === 'PUT') props.getPet(petId)
  }, [ petDetail.status ])

  const _handleFileChange = e => {
    if(e.target.files && e.target.files[0])
      props.setPetImage({
        filepath  : e.target.files[0],
        filename  : e.target.files[0].name,
        filetype  : 'image',
        is_profile: true
      }, 'CREATE')
  }

  const _handleOptionDropdownChange = () => {
    alert('In development...')
  }

  const _handlePhotoAction = (e , data)=>{
    switch (data.value) {
      case 'view_photo':
        props.setPetImage({ filepath: petDetail.item.image_filepath }, 'READ')

        return
      case 'take_photo':
        props.setPetImage({ is_profile: true }, 'TAKE')

        return
      case 'upload_photo':
        if(inputFileRef.current)
          inputFileRef.current.click()

        return
      case 'select_photo':
        props.setPetImage({ is_profile: true }, 'PICK')

        return
      default:
        return
    }
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const imageProfileOptions = useMemo(() => {
    let options = []

    if(petDetail.item.image_filepath)
      options.push({ key: 'view_photo', value: 'view_photo', text: 'View photo' })

    if(cameraIsAvailable)
      options.push({ key: 'take_photo', value: 'take_photo', text: 'Take photo' })

    options.push(
      { key: 'upload_photo', value: 'upload_photo', text: 'Upload photo' },
      { key: 'select_photo', value: 'select_photo', text: 'Select photo' }
    )

    return options
  }, [ petDetail.status ])
  const fullname = `${petDetail.item.name || ''}`
  const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`
  const comesfromClientShowScreen = useMemo(() => Boolean(history.location.state), [])

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar p32'
            computer={5} mobile={16} tablet={16}>
            <Breadcrumb>
              {
                comesfromClientShowScreen ? (
                  <Breadcrumb.Section>
                    <Link to={`/client/${history.location.state.client}`}>{history.location.state.client_fullname}</Link>
                  </Breadcrumb.Section>
                ) : (
                  <Breadcrumb.Section>
                    <Link to='/pet'>Pets</Link>
                  </Breadcrumb.Section>
                )
              }
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>
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
                  <div className='c-image-profile'>
                    <Image circular src={petDetail.item.image_filepath || defaultImageUrl}/>
                    <div className='c-image-profile__overlay'>
                      <Icon className='text-white mb8' name='camera' size='big'/>
                      <span className='text-white text-center'>{petDetail.item.image_filepath ? 'CHANGE' : 'UPLOAD'} <br/>PHOTO</span>
                    </div>
                  </div>
                )}
                value={null}>
                <Dropdown.Menu className='c-image-profile__menu'>
                  {
                    imageProfileOptions.map(_item => (
                      <Dropdown.Item  key={_item.key} onClick={_handlePhotoAction} value={_item.value}>{_item.text}</Dropdown.Item>
                    ))
                  }
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
                  <span style={{ color: '#888888' }}>{petDetail.item.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className='flex align-center'>
                  <div className='mr8'>
                    <span style={{ color: '#888888' }}>Owner :</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link className='text-underline' to={`/client/${petDetail.item.client}`}>{clientFullName}</Link>
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
              <Grid.Row verticalAlign='middle'>
                <Grid.Column computer={16} mobile={16} tablet={10}>
                  <PetProfileProperty name='Breed' value={_get(petDetail.item, 'breed_name', '-')}/>
                </Grid.Column>
                <Grid.Column computer={16} mobile={16} tablet={16}>
                  <PetProfileProperty name='Age' value={getAge(petDetail.item.born_at)}/>
                </Grid.Column>
                <Grid.Column computer={16} mobile={16} tablet={16}>
                  <PetProfileProperty name='Sex' value={petDetail.item.sex === 'F' ? 'Female' : 'Male'}/>
                </Grid.Column>
                <Grid.Column computer={16} mobile={16} tablet={16}>
                  <PetProfileProperty name='Altered' value={petDetail.item.fixed ? 'Yes' : 'No'}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <br/>

            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'} link name='info'
                onClick={_handleMenuItemClick}>
                Pet Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'bookings'} link name='bookings'
                onClick={_handleMenuItemClick}>
                Services
                <Label color='teal'>4</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'vaccinations'} link name='vaccinations'
                onClick={_handleMenuItemClick}>
                Vaccinations
                <Icon color='red' name='warning circle' size='large'/>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'incidents'} link name='incidents'
                onClick={_handleMenuItemClick}>
                Incidents
                <Icon color='red' name='warning circle' size='large'/>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'notes'} link name='notes'
                onClick={_handleMenuItemClick}>
                Notes
                <Label color='teal'>{petNote.items.length}</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'gallery'} link name='gallery'
                onClick={_handleMenuItemClick}>
                Gallery
                <Label color='teal'>{petImage.pagination.meta.total_items || petImage.items.length}</Label>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={16}>
            {activeMenuItem === 'info' && <InformationSection/>}
            {activeMenuItem === 'bookings' && (trainingPackageDetail.mode === 'READ' ? <TrainingPerformance/> : <BookingSection/>)}
            {activeMenuItem === 'vaccinations' && <VaccinationSection/>}
            {activeMenuItem === 'incidents' && <IncidentSection/>}
            {activeMenuItem === 'notes' && <NoteSection/>}
            {activeMenuItem === 'gallery' && <GallerySection/>}
          </Grid.Column>
        </Grid>
      </Segment>

      <ImageEditor
        circularCropper
        duck={petImageDuck}
        duckDetail={petImageDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      petDetail            : petDetailDuck.selectors.detail(state),
      trainingPackageDetail: petReservationTrainingPackageDetail.selectors.detail(state),
      petImage             : petImageDuck.selectors.list(state),
      petNote              : petNoteDuck.selectors.list(state)
    }), {
      getPetImages       : petImageDuck.creators.get,
      getPetNotes        : petNoteDuck.creators.get,
      getPetRetireReasons: petRetireReasonDuck.creators.get,
      getPet             : petDetailDuck.creators.get,
      resetItem          : petDetailDuck.creators.resetItem,
      setPetImage        : petImageDetailDuck.creators.setItem
    })
)(PetShow)
