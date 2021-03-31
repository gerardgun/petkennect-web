import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Divider, Header, List, Radio } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { getAbbreviature } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

import './styles.scss'

const SSO = props => {
  const {
    auth,
    rehydrateTenant
  } = props

  const [ company, setCompany ] = useState({})
  const  { item : { is_superadmin = false,  companies = [] } = {} , status } = auth
  const history = useHistory()

  useEffect(() => {
    if(status === 'REHYDRATED_TENANT' && !auth.tenant) history.push('/organization')
    if(status === 'REHYDRATED_TENANT') history.push('/dashboard')
  }, [ status ])

  const _handleContinueAsManagerClick = () => rehydrateTenant(undefined)

  const _handleSelectOption = e => {
    const companyId = +e.currentTarget.dataset.itemId
    const company = companies.find(item => item.id === companyId)

    setCompany(company)
  }

  const _handleSubmit = () => rehydrateTenant(company.subdomain_prefix)

  return (
    <Container className='auth-sso'>
      <div className='container'>
        <Header as='h2' className='text-center'>Select a company</Header>

        <div className='list-align'><List className='list' selection>
          {
            companies.map(item => (
              <List.Item
                className='list-item' data-item-id={item.id} key={item.id}
                onClick={_handleSelectOption}>
                <div className='item-radio'>
                  <Radio checked={item.id === company.id}/>
                </div>
                <div className='item-logo' style={{ backgroundColor: item.theme_color }}>{getAbbreviature(item.legal_name)}</div>
                <div>
                  <div className='item-title'>{item.legal_name}</div>
                  <div className='item-description'>Administrador</div> {/* <- Role name must be here */}
                </div>
              </List.Item>
            ))
          }
        </List>
        </div>
        <div className='text-center'>
          <Button
            className='submit-button' color='teal' content='Continue'
            disabled={!company.id}
            onClick={_handleSubmit} size='large'/>
        </div>

        {
          is_superadmin && (
            <>
              <Divider horizontal>Or</Divider>
              <Button
                basic className='submit-button' color='teal'
                content='Continue as manager'
                onClick={_handleContinueAsManagerClick} size='large'/>
            </>
          )
        }

      </div>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth,
      initialValues: {
        email   : process.env.NODE_ENV === 'development' ? 'martincruz.cs@gmail.com' : '',
        password: process.env.NODE_ENV === 'development' ? '' : ''
      }
    }),
    {
      signIn         : authDuck.creators.signIn,
      rehydrateTenant: authDuck.creators.rehydrateTenant
    }
  )
)(SSO)
