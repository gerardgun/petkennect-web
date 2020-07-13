import React, { useEffect, useState, useRef } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Grid, Segment, Breadcrumb, Image, Tab, Header, Dropdown, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

import Layout from '@components/Common/Layout'
import ImageEditor from '@components/Common/ImageEditor'
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

const PetShow = ({ petDetail , petImage, ...props }) => {
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const [ openImageEditorModal,setOpenImageEditorModal ] = useState(false)
  const [ initialStep, setInitialStep ] = useState(null)
  const [ initialImageURL, setInitialImageURL ] = useState(null)
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
    if(e.target.files && e.target.files[0]) {
      setInitialImageURL(URL.createObjectURL(e.target.files[0]))
      setInitialStep('EDITOR')
      setOpenImageEditorModal(true)
    }
  }

  const _handlePhotoAction = (e , data)=>{
    switch (data.value) {
      case 'view_photo':
        setInitialImageURL(petDetail.item.image_filepath)
        setInitialStep('VIEW')
        setOpenImageEditorModal(true)

        return
      case 'take_photo':
        setInitialStep('CAMERA')
        setOpenImageEditorModal(true)

        return
      case 'upload_photo':
        if(inputFileRef.current)
          inputFileRef.current.click()

        return
      case 'select_photo':
        setInitialStep('PICKER')
        setOpenImageEditorModal(true)

        return

      default:

        return
    }
  }

  const  _handleCloseImageEditorModal = ()=> {
    setOpenImageEditorModal(false)
    setInitialImageURL(null)
    setInitialStep(null)
  }

  const _handleImageEditorSave = (_imageFile) => {
    if(initialStep === 'select_photo')
      return props.put({ id: petDetail.item.id, image: _imageFile })
        .then(()=> props.getPet(id))
        .catch(()=> {})
        .finally(_handleCloseImageEditorModal)
    /** on conflicts discarts  some this lines,
     *  I saw that you had also modified this part in the saga */

    return props.postPetImage({ pet_id: petDetail.item.id,images: _imageFile })
      .then((result = [])=> {
        return Promise.all([
          props.putPetImage({ pet_id: petDetail.item.id, pet_image_id: result[0].id, is_profile: true }),
          props.getPet(id)
        ])
      })
      .catch(()=> {})
      .finally(_handleCloseImageEditorModal)
  }

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  const fullname = `${petDetail.item.name || ''}`
  const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`

  return (
    <Layout>
      <Segment className='segment-content p-pet-show'>
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
            <div className='flex justify-center align-center mt40 mb16'>
              <Dropdown
                direction='right'
                icon={null}
                onChange={_handlePhotoAction}
                selectOnBlur={false}
                trigger={(
                  <div className='c-image-profile mh-auto'>
                    <Image
                      circular className='c-square-140' size='mini'
                      src={petDetail.item.image_filepath || defaultImage}/>
                    <div className='c-image-profile__overlay'>
                      <Icon className='text-white' name='camera'/>
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
                <Header className='c-title mv0'>{fullname}</Header>
                <Header className='c-label mv0 flex'>
                  Owner :
                  <Link className='text-underline pl8 block'to={`/client/show/${petDetail.item.client}`}>{clientFullName}</Link>
                </Header>
              </div>

              <Button icon>
                <Icon name='ellipsis vertical'/>
              </Button>

            </div>
            <div className='flex justify-between'>
              <div className='w40'>
                <Header as='span' className='c-label'>
                  Breed :{'  '}
                </Header>
                <Header as='span' className='c-value'>
                  {petDetail.item.breed_name || '-'}
                </Header>
              </div>
              <div className='w40'>
                <Header as='span' className='c-label'>
                Age    :{'  '}
                </Header>
                <Header as='span' className='c-value'>
                  {getAge(petDetail.item.born_at)}
                </Header>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w40'>
                <Header as='span' className='c-label'>
                Sex    :{'  '}
                </Header>
                <Header as='span' className='c-value'>
                  {(petDetail.item.sex === 'F' ? 'Female' : 'Male')}
                </Header>
              </div>
              <div className='w40'>
                <Header as='span' className='c-label'>
                Fixed  :{'  '}
                </Header>
                <Header as='span' className='c-value'>
                  {petDetail.item.fixed ? 'Yes' : 'No'}
                </Header>
              </div>
            </div>
            <Tab
              activeIndex={activeTabIndex}
              grid={{ paneWidth: 0, tabWidth: 16 }}
              menu={{ color: 'teal', fluid: true, vertical: true }}
              menuPosition='right'
              onTabChange={_handleTabChange}
              panes={[
                { menuItem: 'Pet Info', render: () => null },
                { menuItem: 'Booking', render: () => null },
                { menuItem: 'Vaccinations', render: () => null },
                { menuItem: 'Incidents', render: () => null },
                { menuItem: 'Notes', render: () => null },
                { menuItem: 'Gallery', render: () => null }
              ]
              }/>
          </Grid.Column>
          <Grid.Column className='shadow-2 p0' width={11}>
            {activeTabIndex === 0 && <FormInformation/>}
            {activeTabIndex === 1 && <BookingSection/>}
            {activeTabIndex === 2 && <VaccinationSection/>}
            {activeTabIndex === 3 && <IncidentSection/>}
            {activeTabIndex === 4 && <NotesSection/>}
            {activeTabIndex === 5 && <GallerySection/>}

          </Grid.Column>

          <ImageEditor
            circularCropper
            initialImageURL={initialImageURL}
            initialStep={initialStep}
            key={`${initialStep}${openImageEditorModal}`}
            onClose={_handleCloseImageEditorModal}
            onSaveImage={
              _handleImageEditorSave
            } open={openImageEditorModal} pickerImages={petImage.items.map(_petImage=> ({
              ..._petImage,
              url: _petImage.filepath
            }))}/>

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
      getPetImages: petImageDuck.creators.get,
      getPet      : petDetailDuck.creators.get,
      putPetImage : petImageDetailDuck.creators.put,
      postPetImage: petImageDetailDuck.creators.post,
      resetItem   : petDetailDuck.creators.resetItem
    })
)(PetShow)
