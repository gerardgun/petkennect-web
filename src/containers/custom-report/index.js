import { Label, Dropdown, Segment, Menu, Header, Grid, Search } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Layout from '@components/Common/Layout'
import customReportDetailDuck from '@reducers/custom-report/detail'
import customReportDuck from '@reducers/custom-report'
import ReportForm from './form'

import './style.scss'

const CustomReport =  ({  customReportDetail,...props }) => {
  const [ searchConditionType, setSearchConditionType ] = useState('All')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    props.getReport()
  },[])

  const _handleMenuItemClick = () => {
    props.setItem(null, 'CREATE')
  }
  const _handleSearchConditionChange = (e, { value }) => {
    setSearchConditionType(value)
  }

  const _handleSearchInputChange = (e,{ value }) => {
    const result = reportSubList.filter((_value) =>{
      if(value == '')
        return _value
      else if(_value.title.toLowerCase().includes(value.toLowerCase()))
        return value
    })

    setSearchTerm(result)
  }

  const _handleResultSelect = (e, { result }) =>
  {
    props.setItem(result, 'CREATE')
  }

  let reportlist =  [ { key: customReportDetail.item.length, value: 'All', text: 'All' } ].concat(customReportDetail.item.map((_item,index)=>{
    return ({ key: index, value: _item.name, text: `${_item.name}` })
  }
  ))

  const reportSubList = []

  customReportDetail.item.forEach((_item,index)=>{
    const reportType = _item.name
    if(searchConditionType === reportType)
      _item.subReport.forEach((_sumItem, sub_index) => {
        reportSubList.push({ id: `${index}_${sub_index}`, title: _sumItem.name, description: `${_item.name}` })
      })
    else if(searchConditionType === 'All')
      _item.subReport.forEach((_sumItem, sub_index) => {
        reportSubList.push({ id: `${index}_${sub_index}`, title: _sumItem.name, description: `${_item.name}` })
      })
  }
  )

  return (
    <Layout>
      <Segment className='segment-content segment-menu-group' padded='very'>
        <Grid className='segment-content-header'>
          <Header as='h2' className='Custom-header'>Run Custom Reports</Header>
          <Grid.Row className='search-dropdown-report'> <div className='search-dropdown'>
            <Dropdown
              className='dropdown-class'
              onChange={_handleSearchConditionChange}
              options={reportlist}
              placeholder='All'
              selection
              value={searchConditionType}/>
            <Search
              className='search-class'
              fluid='true' input={{ icon: 'search', iconPosition: 'left' }}
              onResultSelect={_handleResultSelect}
              onSearchChange={_handleSearchInputChange}
              placeholder='Search'
              results={searchTerm}/>
          </div></Grid.Row>

          <Grid.Row>
            {
              customReportDetail.item.length > 0 &&  customReportDetail.item.map((item)=>{
                return (
                  <>
                    <Grid.Column className='menu-container'>
                      <Menu  className='menu-postion' size='large' vertical>
                        <Menu.Item
                          active=''
                          className='menu-info'
                          name='inbox'>
                          {item.name}
                        </Menu.Item>
                        <div className='outer'>
                          <input id={item.name} type='checkbox'/>
                          <div className='inner'>

                            {

                              item.subReport.map((item)=>{
                                return (
                                  <>

                                    <Menu.Item
                                      active='' link
                                      name='spam'
                                      onDoubleClick={_handleMenuItemClick}>

                                      {item.name}
                                      { item.is_new  && (<Label color='red'>New</Label>)}

                                    </Menu.Item>

                                  </>
                                )
                              })

                            }
                          </div>
                          {item.subReport.length > 5 && (<label
                            basic
                            htmlFor={item.name}
                            style={{ 'float': 'right', padding: '.3em .78571429em' }}><Label className='more-label' >More...</Label> </label>)}
                        </div>

                      </Menu>
                    </Grid.Column>
                  </>
                )
              })
            }

          </Grid.Row>

        </Grid>
      </Segment>
      <ReportForm/>
    </Layout>

  )
}
export default compose(
  connect(
    ({ ...state }) => {
      return {
        customReportDetail: customReportDuck.selectors.detail(state)
      }
    },
    {
      getReport: customReportDuck.creators.get,
      setItem  : customReportDetailDuck.creators.setItem

    })

)(CustomReport)
