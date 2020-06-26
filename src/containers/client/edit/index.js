import React, { useEffect, useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Segment, Image, Breadcrumb, Tab } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import TabClientInfo from './TabClientInfo'
import TabEmergencyInfo from './TabEmergencyInfo'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import { getFormValues, getFormSyncErrors, submit, destroy } from 'redux-form'
import { parseResponseError } from '@lib/utils/functions'

const formIds = [ 'client-edit-step-1-form','client-edit-step-2-form' ]

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const ClientEdit = (props) => {
  const {
    clientDetail,
    clientPet,
    submit,
    forms,
    destroy
  } = props

  const [ activeTabIndex, setTabActiveIndex ] = useState(0)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getClient(id)
    props.getPets({
      client_id: id
    })

    return () => {
      destroy(...formIds)
      props.resetItem()
    }
  }, [])

  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  const _handleSaveBtnClick = () => {
    const formId = formIds[activeTabIndex]

    if(formId) submit(formId)
    else _handleSubmit()
  }

  const _handleSubmit = () => {
    const formIndexWithErrors
      = forms.findIndex((form, index) => {
        return (form.fields.length === 0 || Object.keys(form.errors).length > 0) && [ 0, 1 ].includes(index)
      })

    if(formIndexWithErrors !== -1) {
      setTabActiveIndex(formIndexWithErrors)
      setTimeout(() => submit(formIds[formIndexWithErrors]), 100)
    } else {
      const values = forms
        .map(({ fields, ...rest }) => {
          let parsedFields = fields.reduce((a, b) => {
            const fieldname = /^(\w+).*/.exec(b)[1]

            return a.includes(fieldname) ? a : [ ...a, fieldname ]
          }, [])

          return { fields: parsedFields, ...rest }
        })
        .filter(item => item.fields.length > 0 && Boolean(item.values))
        .map(({ fields, values }) => {
          return fields.reduce((a, b) => ({ ...a, [b]: values[b] }), {})
        })
        .reduce((a, b) => ({ ...a, ...b }))

      let finalValues = Object.entries(values)
        .filter(([ , value ]) => value !== null)
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

      // For checkbox values
      if('legal_sign_on' in finalValues) {
        if(!('legal_liability' in finalValues)) finalValues.legal_liability = false
        if(!('legal_kc_waiver' in finalValues)) finalValues.legal_kc_waiver = false
      }

      return props.put({ id: clientDetail.item.id, user: clientDetail.item.user, ...finalValues })
        .then(()=> history.goBack())
        .catch(parseResponseError)
    }
  }

  const saving = [ 'PUTTING' ].includes(clientDetail.status)

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
        <div className='flex mt36'>
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
            activeIndex={activeTabIndex}
            menu={{ color: 'teal',className: 'mb0',secondary: true, pointing: true }}
            onTabChange={_handleTabChange}
            panes={[
              {
                menuItem: 'Client Info',
                render  : ()=> <TabClientInfo attached={false} clientDetail={clientDetail} onSubmit={_handleSubmit}/>
              },
              {
                menuItem: 'Emergency Data',
                render  : ()=> <TabEmergencyInfo attached={false}  clientDetail={clientDetail} onSubmit={_handleSubmit}/>
              }
            ]
            }/>
          <div className='tab-actions'>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel' disabled={saving}
              size='small'
              to={()=> history.goBack()}/>
            <Button
              className='ml16'
              color='teal'
              content='Save Changes'
              disabled={saving}
              loading={saving}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={_handleSaveBtnClick}
              size='small'/>
          </div>
        </div>

      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      clientPet   : clientPetDuck.selectors.list(state),
      forms       : formIds.map(formId => ({
        fields: Object.keys((state.form[formId] || {}).registeredFields || {}),
        values: getFormValues(formId)(state),
        errors: getFormSyncErrors(formId)(state)
      }))
    }), {
      submit,
      destroy,
      put      : clientDetailDuck.creators.put,
      getClient: clientDetailDuck.creators.get,
      setItem  : clientDetailDuck.creators.setItem,
      resetItem: clientDetailDuck.creators.resetItem,
      getPets  : clientPetDuck.creators.get
    })
)(ClientEdit)
