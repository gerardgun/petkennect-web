import React, { useEffect } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Segment, Image, Breadcrumb, Tab } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import TabClientInfo from './TabClientInfo'
import TabEmergencyInfo from './TabEmergencyInfo'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const ClientShow = ({ clientDetail,clientPet ,...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
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
  const _handleDeleteClick = () => {
    _handleOpen()
  }

  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  return (
    <Layout>
      <Segment className='segment-content p-client-show' padded='very'>
        <Grid>
          <Grid.Column textAlign='left' width={16}>
            <Breadcrumb>
              <Breadcrumb.Section link>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active link>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column >

        </Grid>
        <div className='flex mt35'>
          <div  className='flex align-center w30'>
            <Image avatar className='img-40' src={clientDetail.item.thumbnail_path || defaultImage}/>
            <div className='c-thumbnail'>
              <div className='title'>{fullname}</div>
              <div className='description'>Client</div>
            </div>
          </div>
          <div className=''>
            <div className='text-regular text-black'>Pets ({clientPet.items.length})</div>
            <div>
              {clientPet.items.map(_pet=> (
                <span  key={_pet.id} >
                  <Link className='text-underline pl8'to={`/pet/${_pet.id}`}>{_pet.name}</Link>{', '}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='tab-wrapper'>
          <Tab
            menu={{ color: 'teal',className: 'mb0',secondary: true, pointing: true }} panes={[
              {
                menuItem: 'Client Info',
                render  : ()=> <TabClientInfo attached={false} clientDetail={clientDetail}/>
              },
              {
                menuItem: 'Emergency Data',
                render  : ()=> <TabEmergencyInfo attached={false}  clientDetail={clientDetail}/>
              }
            ]
            }/>
          <div className='tab-actions'>
            <Button
              as={Link}
              icon='edit'
              size='small'
              to={`/client/edit/${clientDetail.item.id}`}/>
            <Button
              color='google plus'
              icon='trash alternate outline' onClick={_handleDeleteClick}
              size='small'/>
            <Button disabled icon='ellipsis vertical' size='small'/>
          </div>
        </div>

      </Segment>
      <ModalDelete
        duckDetail={clientDetailDuck}
        onClose={_handleClose}
        open={open}/>

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
