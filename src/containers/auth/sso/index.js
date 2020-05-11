import './styles.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'
import { Button, Container,  Header, List, Radio } from 'semantic-ui-react'

import authDuck from '@reducers/auth'
import { parseResponseError } from '@lib/utils/functions'
import { useHistory } from 'react-router-dom'

const SSO = props => {
  const {
    auth,
    rehydrateTenant

  } = props

  const [ company, setCompany ] = useState({})
  const  { item : { is_superadmin = false,  companies = [ ] } = {} , status } = auth
  const history = useHistory()

  const getAbbrev = ({ legal_name = '' }) => legal_name
    .split(' ')
    .map(str=> str.trim()[0])
    .filter((_ , index)=> index < 2)
    .join(' ').toUpperCase()

  const _handleSelectOption = (_company) => ()=> setCompany(_company)

  const _handleSubmit = () => {
    return rehydrateTenant(company.subdomain_prefix)
      .catch(parseResponseError)
  }
  useEffect(() => {
    if(status === 'REHYDRATED_TENANT' && !auth.tenant) history.push('/organization')
    if(status === 'REHYDRATED_TENANT') history.push('/dashboard')
  }, [ status ])

  return (
    <Container className='auth-sso'>

      <div className='container'>
        <Header as='h2' className='text-center'>Select company</Header>
        <List className='list' selection>
          {  is_superadmin && <List.Item
            className='list-item'
            onClick={_handleSelectOption({ id: 'SUPER_ADMIN_ID', subdomain_prefix: undefined })}>
            <div className='item-radio'>
              <Radio checked={company.id === 'SUPER_ADMIN_ID'}/>
            </div>
            <div className='item-logo'>PK</div>
            <div>
              <div className='item-title'>Pet Kennect</div>
              <div className='item-description'>Super admin</div>
            </div>
          </List.Item>}
          {companies.map(_company => (
            <List.Item
              className='list-item' key={_company.id} onClick={_handleSelectOption(_company)}>
              <div className='item-radio'>
                <Radio checked={_company.id === company.id}/>
              </div>
              <div className='item-logo'>{getAbbrev(_company)}</div>
              <div>
                <div className='item-title'>{_company.legal_name}</div>
                <div className='item-description'>{_company.is_superadmin ? 'Super Admin' : 'Employee'}</div>
              </div>
            </List.Item>
          ))}
        </List>

        <Button
          className='submit-button' color='teal' onClick={_handleSubmit}
          size='large'>Continue</Button>
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
