import React, { useEffect,useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Segment, Header, Image, Breadcrumb,Dropdown, Tab,Icon } from 'semantic-ui-react'

import FormInformation from './FormInformation'
import PetSection from './PetsSection'
import CommentsSection from './CommentsSection'
import Layout from '@components/Common/Layout'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const ClientShow = ({ clientDetail,clientPet ,...props }) => {
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getClient(id)
    props.getPets({
      client_id: id
    })

    return () => {
      props.resetItem()
    }
  }, [])
  useEffect(()=> {
    if(clientDetail.status === 'DELETED')
      history.replace('/client')
  }, [ clientDetail.status ])

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)
  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  return (
    <Layout>

      <Segment className='segment-content p-pet-show'>
        <Grid>
          <Grid.Column className='p40' width={5}>
            <Breadcrumb>
              <Breadcrumb.Section link>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active link>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>

            <Image
              circular className='c-square-140 mh-auto mt40 mb16' size='mini'
              src={clientDetail.item.thumbnail_path || defaultImage}/>

            <input
              accept='image/*'
              hidden
              type='file'/>
            <div className='flex justify-between align-center mb24'>
              <div>
                <Header className='c-title mv0'>{fullname}</Header>
                <Header className='c-label mv0 flex'>
                  {clientDetail.item.status}
                </Header>
              </div>
              <Dropdown
                icon={null}
                options={[
                  { key: 'view_photo', value: 'view_photo', text: 'View photo' },
                  { key: 'take_photo', value: 'take_photo', text: 'Take photo' },
                  { key: 'upload_photo', value: 'upload_photo', text: 'Upload photo' },
                  { key: 'select_photo', value: 'select_photo', text: 'Select photo' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button icon>
                    <Icon name='ellipsis vertical'/>
                  </Button>
                )}
                value={null}/>
            </div>
            <div>
              <Button
                className='w100' color='teal'
                content='Book!'/>
            </div>
            <Tab
              activeIndex={activeTabIndex}
              grid={{ paneWidth: 0, tabWidth: 16 }}
              menu={{ color: 'teal', fluid: true, vertical: true }}
              menuPosition='right'
              onTabChange={_handleTabChange}
              panes={[
                { menuItem: 'Client Info', render: () => null },
                { menuItem: 'Pets', render: () => null },
                { menuItem: 'Internal Comments', render: () => null }
              ]
              }/>
          </Grid.Column>
          <Grid.Column className='shadow-2 p0' width={11}>
            {activeTabIndex === 0 && <FormInformation/>}
            {activeTabIndex === 1 && <PetSection clientPet={clientPet}/>}
            {activeTabIndex === 2 && <CommentsSection/>}

          </Grid.Column>

        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      clientPet   : clientPetDuck.selectors.list(state)
    }), {
      getClient: clientDetailDuck.creators.get,
      setItem  : clientDetailDuck.creators.setItem,
      resetItem: clientDetailDuck.creators.resetItem,
      getPets  : clientPetDuck.creators.get
    })
)(ClientShow)
