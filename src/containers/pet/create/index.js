import React, { useEffect, useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Grid, Segment, Breadcrumb, Image, Tab, Header, Dropdown, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

import Layout from '@components/Common/Layout'
import FormInformation from './FormInformation'
import BookingSection from './BookingSection'
import VaccinationSection from './VaccinationSection'
import IncidentSection from './IncidentSection'
import NotesSection from './NotesSection'
import GallerySection from './GallerySection'

import petDetailDuck from '@reducers/pet/detail'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const PetShow = ({ petDetail ,...props }) => {
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    props.getPet(id)

    return () => {
      props.resetItem()
    }
  }, [])

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
            <Image
              circular className='c-square-140 mh-auto mt40 mb16' size='mini'
              src={petDetail.item.thumbnail_path || defaultImage}/>
            <div className='flex justify-between align-center mb24'>
              <div>
                <Header className='c-title mv0'>{fullname}</Header>
                <Header className='c-label mv0 flex'>
                  Owner :
                  <Link className='text-underline pl8 block'to={`/client/show/${petDetail.item.client}`}>{clientFullName}</Link>
                </Header>
              </div>
              <Dropdown
                // onChange={_handleSessionDropdownChange}
                icon={null}
                options={[
                  { key: 'view_photo', value: 'view_photo', text: 'View photo' },
                  { key: 'take_photo', value: 'take_photo', text: 'Take a photo ' },
                  { key: 'upload_photo', value: 'upload_photo', text: 'Upload photo' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button icon>
                    <Icon name='ellipsis vertical'/>
                  </Button>
                )}
                value={null}/>
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
        </Grid>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      getPet   : petDetailDuck.creators.get,
      resetItem: petDetailDuck.creators.resetItem
    })
)(PetShow)
