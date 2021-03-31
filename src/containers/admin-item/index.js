import React, { useState } from 'react'
import { Segment,Header, Grid, Search, Dropdown, Menu } from 'semantic-ui-react'
import loadable from '@loadable/component'
import { useHistory } from 'react-router-dom'
import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))

const AdminItem = ()=>{
  const [ searchConditionType, setSearchConditionType ] = useState('all')
  const [ results, setResultsTerm ] = useState([])

  const history = useHistory()

  const dropDownOptions = [ { id: 0, value: 'all', text: 'All' },
    { id: 1, value: 'Animals', text: 'Animals' },
    { id: 2, value: 'Services' , text: 'Services' },
    { id: 3, value: 'Application Settings', text: 'Application Settings' },
    { id: 4, value: 'Employee Management', text: 'Employee Management' },
    { id: 5, value: 'Other', text: 'Other' },
    { id: 6, value: 'Forms and Templates', text: 'Forms and Templates' } ]

  const _handleSearchConditionChange = (e, { value }) => {
    setSearchConditionType(value)
  }

  const adminItems = [ { option   : 'Animals', subOption: [ { name: 'Breed Manager', path: '/setup/animal-setting/breed-manager' },{ name: 'Behavior Tags', path: '/setup/animal-setting/behavior-tag'  },
    { name: 'Feeding Settings', path: '/setup/animal-setting/feeding' },{ name: 'Incident Management',path: '/setup/animal-setting'  },{ name: 'Medication Settings', path: '/setup/animal-setting/medication' },
    { name: 'Retire Reasons', path: '/setup/animal-setting' },

    { name: 'Species', path: '/setup/animal-setting' },{ name: 'Vaccinations', path: '/setup/animal-setting/vaccination' } ] },

  { option   : 'Services' , subOption: [ { name: 'Boarding Settings', path: '/setup/service-setting' }, { name: 'Commands', path: '/setup/service-setting'   },
    { name: 'Day Services Settings',path: '/setup/service-setting' },{ name: 'Grooming Settings',path: '/setup/service-setting' },{ name: 'Kennels', path: '/setup/pet-kennel' } ,{ name: 'Kennel Types', path: '/setup/pet-kennel-type' },{ name: 'Kennel Areas', path: '/setup/pet-kennel-area' },
    { name: 'Method', path: '/setup/service-setting'  },{ name: 'Reason', path: '/setup/service-setting'  },{ name: 'Rating Keys', path: '/setup/service-setting'  },{ name: 'Training Settings',path: '/setup/service-setting' }
  ] },
  { option: 'Application Settings' , subOption: [  { name: 'Calendar',path: '/setup/calendar' },{ name: 'Locations', path: '/setup/location' },{ name: 'Notifications', path: '/setup/notifications' },{ name: 'Run Cards', path: '' },{ name: 'Report Cards', path: '/custom-report' },{ name: 'System Icons and Codes', path: '/setup/color-codes' } ] },
  { option: 'Employee Management' , subOption: [ { name: 'Payroll', path: '' },{ name: 'Schedule', path: '' },{ name: 'Tasklists', path: '' },{ name: 'Users/Roles', path: '/employee' } ] },
  { option: 'Other' , subOption: [ { name: 'Payment Method', path: '/setup/payment-method' },{ name: 'Payment Instruction', path: '/setup/payment-instruction' },{ name: 'Price Master', path: '/setup/price-master' } ] },
  { option: 'Forms and Templates' , subOption: [ { name: 'Client Agreements',path: '/setup/agreement' },{ name: 'Email Template',path: '/setup/email-template' } ] }
  ]

  let optionType
  const  searchOption = []
  adminItems.forEach((_item,index) =>{
    optionType = _item.option
    if(optionType === searchConditionType)

      _item.subOption.map((item,sub_index)=>{
        searchOption.push({ id: `${index}_${sub_index}`, title: item.name,path: item.path })
      })

    else if(searchConditionType === 'all')

      _item.subOption.map((item,sub_index)=>{
        searchOption.push({ _id: `${index}_${sub_index}`, title: item.name, path: item.path })
      })
  })

  const _handleSearchInputChange = (e,{ value }) => {
    const result = searchOption.filter((_value) =>{
      if(value == '')
        return _value
      else if(_value.title.toLowerCase().includes(value.toLowerCase()))
        return value
    })
    setResultsTerm(result)
  }

  const _handleResultSelect = (e,{ result })=>{
    history.push(result.path)
  }

  const _handleMenuItemOnClick = (e, { value }) =>
  {
    history.push(value.path)
  }

  return (

    <Layout>
      <Segment className='segment-content segment-menu-group' padded='very'>
        <Grid className='segment-content-header'>
          <Header as='h2' className='pl0'>Admin Items</Header>
          <Grid.Row > <div className='admin-search-dropdown'>
            <Dropdown
              className='dropdown-class'
              onChange={_handleSearchConditionChange}
              options={dropDownOptions}
              placeholder='All'
              selection
              value={searchConditionType}/>
            <Search
              fluid={true} input={{ icon: 'search', iconPosition: 'left' }}
              onResultSelect={_handleResultSelect}
              onSearchChange={_handleSearchInputChange}
              placeholder='Search'
              results={results}/>
          </div>

          </Grid.Row>

        </Grid>

        <Grid className='pr12' columns={3}>
          <Grid.Column>
            <Menu
              borderless
              className='setup-menu' fluid size='large'
              vertical>

              <Menu.Item
                className='header-menu'
                link
                name='animal'
                onClick={_handleResultSelect}><Header
                  as='h4' className='mb8' color='teal'
                  content='Animals' icon='paw'/>

              </Menu.Item>
              {
                adminItems[0].subOption && adminItems[0].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }

            </Menu>

          </Grid.Column>

          <Grid.Column>
            <Menu
              borderless
              className='setup-menu' fluid size='large'
              vertical>
              <Menu.Item

                className='header-menu'
                link
                name='clients'><Header
                  as='h4' className='mb8' color='teal'
                  content='Services' icon='qrcode'/>

              </Menu.Item>
              {
                adminItems[1].subOption && adminItems[1].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }

            </Menu>

          </Grid.Column>

          <Grid.Column>
            <Menu
              borderless
              className='setup-menu' fluid size='large'
              vertical>

              <Menu.Item

                className='header-menu'
                link
                name='employee'><Header
                  as='h4'
                  className='mb8' color='teal' content='Employee Management'
                  icon='users'/>

              </Menu.Item>
              {
                adminItems[3].subOption && adminItems[3].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }

            </Menu>

          </Grid.Column>

        </Grid>
        {/* second row */}
        <Grid className='pr12 pt20' columns={3}>
          <Grid.Column>
            <Menu
              borderless
              className='setup-menu-bottom' fluid size='large'
              vertical>

              <Menu.Item

                className='header-menu'
                link
                name='application_settings'><Header
                  as='h4' className='mb8' color='teal'
                  content='Application Settings' icon='settings'/>

              </Menu.Item>
              {
                adminItems[2].subOption && adminItems[2].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }

            </Menu>

          </Grid.Column>

          <Grid.Column>
            <Menu
              borderless
              className='setup-menu-bottom' fluid size='large'
              vertical>

              <Menu.Item

                className='header-menu'
                link
                name='animal'><Header
                  as='h4' className='mb8' color='teal'
                  content='Other' icon='cube'/>

              </Menu.Item>
              {
                adminItems[4].subOption && adminItems[4].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }
            </Menu>

          </Grid.Column>

          <Grid.Column>
            <Menu
              borderless
              className='setup-menu-bottom' fluid size='large'
              vertical>
              <Menu.Item

                className='header-menu'
                link
                name='services'><Header
                  as='h4' className='mb8' color='teal'
                  content='Forms and Templates' icon='wpforms'/>

              </Menu.Item>
              {
                adminItems[5].subOption && adminItems[5].subOption.map((item,index)=>{
                  return (

                    <Menu.Item
                      key={index}
                      link
                      name={item.name}
                      onClick={_handleMenuItemOnClick}
                      value={item}>
                      {item.name}

                    </Menu.Item>

                  )
                })
              }

            </Menu>

          </Grid.Column>

        </Grid>
      </Segment>
    </Layout>

  )
}

export default AdminItem
