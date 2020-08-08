import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Segment, Header, Image, Breadcrumb,Dropdown, Tab } from 'semantic-ui-react'

import FormInformation from './FormInformation'
import PetSection from './PetsSection'
import CommentsSection from './CommentsSection'
import DocumentsSection from './DocumentsSection'
import AgreementsSection from './AgreementsSection'
import Layout from '@components/Common/Layout'
import { defaultImageUrl } from '@lib/constants'
import Message from '@components/Message'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import clientAgreementDuck from '@reducers/client/agreement'

import './styles.scss'

const ClientShow = ({ clientDetail,clientAgreement, ...props }) => {
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const { client: clientId } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getClient(clientId)
    props.getClientPets({
      client__id: clientId
    })
    props.getClientAgreements({
      client_id: clientId
    })

    return () => {
      props.resetItem()
    }
  }, [])

  useEffect(()=> {
    if(clientDetail.status === 'DELETED')
      history.replace('/client')
  }, [ clientDetail.status ])

  const _handleOptionDropdownChange = () => {
    alert('In development...')
  }
  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)
  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column className='p40' width={5}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>

            <div className='flex justify-center align-center mt40'>
              <div className='c-image-profile'>
                <Image circular src={clientDetail.item.thumbnail_path || defaultImageUrl}/>
              </div>
            </div>

            <div className='flex justify-between align-center mb24'>
              <div>
                <Header className='c-title mv0'>{fullname}</Header>
                <Header className='c-label mv0 flex'>
                  {clientDetail.item.status}
                </Header>
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
            <div>
              <Button
                className='w100' color='teal'
                content='Book!'/>
            </div>
            <div className='mt20 comment_message'>
              {
                clientAgreement.items && clientAgreement.items.filter(item => item.is_pending && item.is_active).length > 0
                  ? (
                    <Message
                      content={
                        <Grid padded style={{ marginLeft: -16 }}>
                          <Grid.Column className='mb0 pb0' width='16'>
                            <div className='message__title'>Client hasn&apos;t signed agreements.</div>
                          </Grid.Column>
                        </Grid>
                      } type='warning'/>
                  ) : ''
              }
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
                { menuItem: 'Internal Comments', render: () => null },
                { menuItem: 'Documents', render: () => null },
                { menuItem: 'Agreements', render: () => null }
              ]
              }/>
          </Grid.Column>
          <Grid.Column className='shadow-2 p0' width={11}>
            {activeTabIndex === 0 && <FormInformation/>}
            {activeTabIndex === 1 && <PetSection/>}
            {activeTabIndex === 2 && <CommentsSection/>}
            {activeTabIndex === 3 && <DocumentsSection/>}
            {activeTabIndex === 4 && <AgreementsSection/>}
          </Grid.Column>

        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      clientDetail   : clientDetailDuck.selectors.detail(state),
      clientAgreement: clientAgreementDuck.selectors.list(state)
    }), {
      getClient          : clientDetailDuck.creators.get,
      setItem            : clientDetailDuck.creators.setItem,
      resetItem          : clientDetailDuck.creators.resetItem,
      getClientPets      : clientPetDuck.creators.get,
      getClientAgreements: clientAgreementDuck.creators.get
    })
)(ClientShow)
