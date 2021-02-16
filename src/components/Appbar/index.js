import React, { useMemo, useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, useHistory } from 'react-router-dom'

import { Button,Search,Container,Dropdown,Grid, Icon } from 'semantic-ui-react'

import { getAbbreviature } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import applicationDuck from '@reducers/application'

import './styles.scss'

const AppBar = ({ auth, location, applicationDetail, ...props }) => {
  const [ show, setShow ] = useState(false)
  const [ searchResult, setSearchResult ] = useState([])
  const [ searchConditionType, setSearchConditionType ] = useState('all')

  useEffect(() => {
    setSearchResult(applicationDetail.appbar_search_results)
  },[ applicationDetail.status ])

  const _handleLocationChange = (e, { value }) => {
    props.set({
      location: value
    })
  }

  const history = useHistory()

  const _handleSessionDropdownItemClick = (e, { value }) => {
    if(value === 'sign-out')
      props.signOut()
  }

  const _handleSessionDropdownOpen = (e, { open }) => setShow(!open)

  const _handleTenantDropdownItemClick = (e, { value }) => {
    props.rehydrateTenant(value)
  }

  const _handleSearchInputChange = (e, { value }) => {
    props.getSearchResult({
      search   : value,
      page_size: 5,
      type     : searchConditionType
    })
  }

  const _handleSearchConditionChange = (e, { value }) => {
    setSearchConditionType(value)
  }

  const _handleResultSelect = (e, { result }) =>
  {
    if(result.description == 'Client')
      history.push(`/client/${result.id}`)
    else
      history.push(`/pet/${result.id}`)
  }

  const userFullName = `${auth.item.first_name} ${auth.item.last_name}`
  const userAbbrev = getAbbreviature(userFullName)
  const locationItems = useMemo(() => {
    return location.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : item.code.length > 16 ? item.code.substr(0,15) + '...' : item.code
    }))
  }, [ location.status ])

  return (

    <Container className='appbar-items'>
      <Grid>
        <Grid.Column
          className='appbar-searchbar' computer={12} mobile={16}
          tablet={12}>
          {
            !auth.item.is_superadmin && (
              <>
                <div className='search-dropdown'>
                  <Dropdown
                    onChange={_handleSearchConditionChange}
                    options={[
                      { key: 1, value: 'all', text: 'All' },
                      { key: 2, value: 'clients', text: 'Clients' },
                      { key: 3, value: 'pets', text: 'Pets' }
                    ]}
                    placeholder='All'
                    selection
                    value={searchConditionType}/>
                  <Search
                    fluid='true' input={{ icon: 'search', iconPosition: 'left' }}
                    onResultSelect={_handleResultSelect} onSearchChange={_handleSearchInputChange} results={searchResult}/>
                </div>
              </>
            )
          }
        </Grid.Column>
        <Grid.Column
          className='appbar-user-dropdown' computer={4} mobile={16}
          tablet={4}>
          <div className='auth-session-dropdown'>
            {
              !auth.item.is_superadmin && (
                <>
                  <Dropdown
                    onChange={_handleLocationChange}
                    options={locationItems}
                    value={auth.location}/>
                  <Icon className='ml8' name='map marker alternate'/>
                </>
              )
            }
            <Dropdown
              className='avatar'
              icon={null}
              onClose={_handleSessionDropdownOpen}
              onOpen={_handleSessionDropdownOpen}
              open={show}
              trigger={(
                <div className='avatar-trigger'>
                  <div>
                    <div className='avatar-circle'>{userAbbrev}</div>
                  </div>
                  <div className='avatar-icon'>
                    <Icon name={show ? 'caret up' : 'caret down'}/>
                  </div>
                </div>
              )}>
              <Dropdown.Menu>
                <Dropdown.Header
                  content={
                    <div>
                      <div className='avatar-trigger'>
                        <div>
                          <div className='avatar-circle'>{userAbbrev}</div>
                        </div>
                        <div className='avatar-user'>
                          <p>{userFullName}</p>
                          <span>{auth.item.email}</span>
                        </div>
                      </div>
                      <Button
                        as={Link} basic
                        color='teal' content='Edit Profile'
                        to='/auth/me'/>
                    </div>
                  }/>
                <Dropdown.Divider/>
                <Dropdown.Header
                  content={
                    <div>
                      <p>Signed as</p>
                      <strong>
                        {
                          props.currentTenant && `${props.currentTenant.legal_name} - ${props.currentTenant.is_main_admin ? 'Super Administrador' : 'Administrador'}`
                        }
                        {
                          auth.item.is_superadmin && 'Petkennect Manager'
                        }
                      </strong>
                    </div>
                  }/>
                <Dropdown.Divider/>
                {
                  !auth.item.is_superadmin && (
                    <>
                      <Dropdown.Header content='Change to'/>
                      <Dropdown.Menu scrolling>
                        {
                          auth.item.companies.map((item, index) => (
                            <Dropdown.Item
                              // className={item.id === props.currentTenant.id ? 'selected' : ''}
                              key={index} onClick={_handleTenantDropdownItemClick} text={`${item.legal_name} - Administrador`}
                              value={item.subdomain_prefix}/>
                          ))
                        }
                      </Dropdown.Menu>
                      <Dropdown.Divider/>
                    </>
                  )
                }
                <Dropdown.Item text='Help' value='help'/>
                <Dropdown.Item text='Settings' value='settings'/>
                <Dropdown.Item onClick={_handleSessionDropdownItemClick} text='Sign Out' value='sign-out'/>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
export default compose(
  connect(
    ({ auth, location, ...state }) => {
      return {
        auth,
        location,
        currentTenant    : authDuck.selectors.getCurrentTenant(auth),
        applicationDetail: applicationDuck.selectors.detail(state)
      }
    },
    {
      getSearchResult: applicationDuck.creators.get,
      signOut        : authDuck.creators.signOut,
      rehydrateTenant: authDuck.creators.rehydrateTenant,
      set            : authDuck.creators.set
    }
  )
)(AppBar)
