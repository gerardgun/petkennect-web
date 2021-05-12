import React,  { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Header, Icon, Menu, Segment, Image, Grid, Dropdown, Search } from 'semantic-ui-react'
import _get from 'lodash/get'

import Layout from '@components/Common/Layout'
import items from './items'
import './styles.scss'
const SetupIndex = () => {
  const [ searchConditionType, setSearchConditionType ] = useState('all')
  const [ results, setResultsTerm ] = useState([])
  const [ searchState, setSearchState ] = useState([])

  const dropDownOptions = [ { id: 0, value: 'all', text: 'All' },
    { id: 1 ,value: 'Application Settings', text: 'Application Settings' },
    { id: 2,value: 'Animals', text: 'Animals' },
    { id: 3,value: 'Company', text: 'Company' },
    { id: 4 ,value: 'Services & Reservations', text: 'Services & Reservations' },
    { id: 5 ,value: 'Employee Management', text: 'Employee Management' },
    { id: 6 ,value: 'Forms & Templates', text: 'Forms & Templates' },
    { id: 7 ,value: 'Financial Settings', text: 'Financial Settings' },
    { id: 8 ,value: 'Capacity Managment', text: 'Capacity Management' },
    { id: 9 ,value: 'Client Portal', text: 'Client Portal' },
    { id: 10,value: 'Miscellaneous', text: 'Miscellaneous' }
  ]

  let optionType
  const  searchOption = []
  items.forEach((_item,index) =>{
    optionType = _item.name
    if(optionType === searchConditionType)

      _item.items.map((item,sub_index)=>{
        searchOption.push({ id: `${index}_${sub_index}`, title: item.name,to: item.to })
      })

    else if(searchConditionType === 'all')

      _item.items.map((item,sub_index)=>{
        searchOption.push({ _id: `${index}_${sub_index}`, title: item.name, to: item.to })
      })
  })

  const _handleSearchConditionChange = (e, { value }) => {
    setSearchConditionType(value)
  }
  const _handleSearchInputChange = (e,{ value })=>{
    const result = searchOption.length > 0 && searchOption.filter((_value)=>{
      if(value == '') {
        setSearchState([])

        return value
      }

      if(_value.title.toLowerCase() == value.toLowerCase())
        setSearchState(_value.title)

      if(_value.title.toLowerCase().includes(value.toLowerCase()))
        return value
    })

    setResultsTerm(result)
    if(result == '')
      setSearchState([])
  }

  const _handleResultSelect = (e,{ result })=>{
    setSearchState(result.title)
  }

  return (
    <Layout>
      <div className='admin-item-div'>

        <Segment className='segment-content' padded='very'>

          <div style={{  marginBottom: '40px' }}>
            <Header as='h2'>
          Administrative Settings
              <Header.Subheader className='mt12'>
            Set up Your PetKennect Application
              </Header.Subheader>
            </Header>
          </div>
          <Grid style={{ marginRight: '1px', marginBottom: '20px' }}>
            <Grid.Row >

              <div className='admin-search-bar-dropdown'>
                <Dropdown
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
          <Card.Group itemsPerRow={5}>
            {
              items.map((item, index) => (

                <Card key={index} >
                  <div className='admin-setting-card'>
                    <Card.Content>
                      {/* <Header as='h4' color='teal'>
            <Icon name={item.icon}/>{item.name}
          </Header> */}
                      <div className='header-div'>
                        <Header as='h5' className='pl4' color='teal'>
                          {
                            item.image != undefined ? <Image
                              size={item.name == 'Miscellaneous'
                        || item.name == 'Client Portal' ? 'tiny' : 'mini'} src={item.image}/>
                              : <Icon name={item.icon}/>
                          }
                          {item.name}
                        </Header>
                      </div>
                      <div className='admin-card-menu'>
                        <Menu fluid secondary vertical>
                          {
                            item.items.map((item, index) => (
                              <Menu.Item
                                as={Link}
                                className={searchState.includes(item.name) ? 'menu-item-admin-div' : ''}
                                disabled={_get(item, 'disabled', false)}  key={index}
                                to={item.to}>{item.name}</Menu.Item>
                            ))
                          }
                        </Menu>
                      </div>

                    </Card.Content>
                  </div>
                </Card>

              ))
            }

          </Card.Group>

        </Segment>
      </div>

    </Layout>
  )
}

export default SetupIndex
