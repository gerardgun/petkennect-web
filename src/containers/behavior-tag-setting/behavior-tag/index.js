import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Search, Label, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'
import ratingKeyDetailDuck from '@reducers/rating-key/detail'
import './styles.scss'

const  BehaviorTagForm = loadable(() => import('./create'))

const BehaviorTag = ({ ...props }) => {
  const [ searchTerm, setSearchTerm ] = useState([])
  const [ searchArray,setSearchArray ] = useState([])

  const tag = [ { id: 1 , title: 'Leash Reactive' }, { id: 2 , title: 'FearAggresive' }, { id: 3 , title: 'Fence Jumper' }, { id: 4, title: 'Kennel Reactive' }, { id: 5, title: 'Food Aggressive' }, { id: 6, title: 'Excessive Barking' },
    { id: 7, title: 'Marks' } , { id: 8, title: 'Barrier Aggressive' } ]

  const daycamp = [ { id: 1 ,title: 'Gate Guarding' }, { id: 2, title: 'Over-Corrects' }, { id: 3, title: 'Zoomies' }, { id: 4, title: 'Inappropriate Playstyle' } ]
  const boarding = [ { id: 1, title: 'Gate Guarding' }, { id: 3, title: 'Over-Corrects' },{ id: 4, title: 'Gate Guarding' } ]
  const grooming = [ { id: 1, title: 'No Nails' }, { id: 2 ,  title: 'No Dreme' }, { id: 2, title: 'Special Shampoo' },{ id: 3,  title: 'No Dryer' }  ]

  let searchOption = []
  for (let item of tag)
    searchOption.push({ title: item.title })

  for (let item of daycamp)
    searchOption.push({ title: item.title })

  for (let item of boarding)
    searchOption.push({ title: item.title })
  for (let item of grooming)
    searchOption.push({ title: item.title })

  const unique = [ ...new Set(searchOption.map(item=>item.title)) ]
  const uniqueSearchOption = unique.map((item,index)=>({ key: index, title: item }))

  const _handleR = ()=>{

  }

  const _handleAddButtonClick = ()=>{
    props.setItem(null,'CREATE')
  }
  const _handleSearchInputChange = (e,{ value })=>{
    const result = uniqueSearchOption.length > 0 && uniqueSearchOption.filter((_value)=>{
      if(value == '')
        return value
      else if(_value.title.toLowerCase().includes(value.toLowerCase()))
        return value
    })
    setSearchTerm(result)
    if(result == '')
      setSearchArray([])
  }

  const _handleResultSelect = (e,{ result })=>{
    setSearchArray(result.title)
  }

  return (
    <>
      <Grid className='segment-content-header'>
        <Grid.Column
          className='pb0' computer={16} mobile={16}
          tablet={16}>
          <Header as='h4' className='cls-MainHeader'>Behavior tags can be added throughout a pet’s records.  You can also create tags specific to service types.</Header>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={7} tablet={16}>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align pr0' computer={6} mobile={16}
          tablet={10}>
          <div className='search-dropdown search-width'>
            <Search
              input={{ icon: 'search', iconPosition: 'left' }}
              onResultSelect={_handleResultSelect}
              onSearchChange={_handleSearchInputChange}
              placeholder='Search'
              results={searchTerm}/>
          </div>
        </Grid.Column>

        <Grid.Column
          className='ui-grid-align grid-button pl0'
          computer={3} mobile={16} tablet={6}>

          <Button
            className='add-new-tag'
            color='teal'
            content='Add New Tag'
            floated='left'
            icon='add'
            onClick={_handleAddButtonClick}/>
        </Grid.Column>
      </Grid>

      <Segment className='mh16'>
        <Grid>
          <Grid.Column  computer={16}>
            <Header as='h3' className='cls-MainHeader'>GENERAL TAGS</Header>
            <Segment className='general-tag-segment'>
              {
                tag.length > 0 && tag.map((_item,_index)=>{
                  let searched = searchArray.length > 0 && searchArray.includes(_item.title) ? true : false

                  return (
                    <Label
                      as='a'
                      basic={!searched}
                      className='ml0 mr12 mt12'
                      color={searched ? 'blue' : 'teal'}
                      key={_index} size='large'>
                      <Icon name='delete' onClick={_handleR}/>&nbsp;&nbsp;
                      {_item.title}
                    </Label>

                  )
                })
              }

            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment className='mh16'>
        <Header as='h3' className='cls-MainHeader'>SERVICE SPECIFIC TAGS</Header><br/>
        <Grid>
          <Grid.Column
            computer={8} mobile={16}
            tablet={8}>
            <Header as='h3' className='cls-MainHeader'>Day Services</Header>
            <Segment className='general-tag-segment'>
              {
                daycamp.length > 0 && daycamp.map((_item,_index)=>{
                  let searched = searchArray.length > 0 && searchArray.includes(_item.title) ? true : false

                  return (

                    <Label
                      as='a'
                      basic={!searched}
                      className='ml0 mr12 mt12'
                      color={searched ? 'blue' : 'teal'}
                      key={_index} size='large'>
                      <Icon name='delete' onClick={_handleR}/>&nbsp;&nbsp;
                      {_item.title}
                    </Label>

                  )
                })
              }

            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={8} mobile={16}
            tablet={8}>
            <Header as='h3' className='cls-MainHeader'>Boarding</Header>
            <Segment className='general-tag-segment'>
              {
                boarding.length > 0 && boarding.map((_item,_index)=>{
                  let searched = searchArray.length > 0 && searchArray.includes(_item.title) ? true : false

                  return (

                    <Label
                      as='a'
                      basic={!searched}
                      className='ml0 mr12 mt12'
                      color={searched ? 'blue' : 'teal'}
                      key={_index} size='large'>
                      <Icon name='delete' onClick={_handleR}/>&nbsp;&nbsp;
                      {_item.title}
                    </Label>

                  )
                })
              }

            </Segment>
          </Grid.Column>
        </Grid>

        <Grid>{/* if no tags there should show no tags */}
          <Grid.Column
            computer={8} mobile={16}
            tablet={8}>
            <Header as='h3' className='cls-MainHeader'>Training</Header>
            <Segment className='general-tag-segment'>
              {
                boarding.length > 0 && boarding.map((_item,_index)=>{
                  let searched = searchArray.length > 0 && searchArray.includes(_item.title) ? true : false

                  return (

                    <Label
                      as='a'
                      basic={!searched}
                      className='ml0 mr12 mt12'
                      color={searched ? 'blue' : 'teal'}
                      key={_index} size='large'>
                      <Icon name='delete' onClick={_handleR}/>&nbsp;&nbsp;
                      {_item.title}
                    </Label>

                  )
                })
              }

            </Segment>

          </Grid.Column>
          <Grid.Column
            computer={8} mobile={16}
            tablet={8}>
            <Header as='h3' className='cls-MainHeader'>Grooming</Header>
            <Segment className='general-tag-segment'>
              {
                grooming.length > 0 && grooming.map((_item,_index)=>{
                  let searched = searchArray.length > 0 && searchArray.includes(_item.title) ? true : false

                  return (

                    <Label
                      as='a'
                      basic={!searched}
                      className='ml0 mr12 mt12'
                      color={searched ? 'blue' : 'teal'}
                      key={_index} size='large'>
                      <Icon name='delete' onClick={_handleR}/>&nbsp;&nbsp;
                      {_item.title}
                    </Label>

                  )
                })
              }

            </Segment>
          </Grid.Column>
        </Grid>

      </Segment>
      <BehaviorTagForm/>

    </>
  )
}

export default compose(
  connect(
    (state) => ({

      ratingKeyDetail: ratingKeyDetailDuck.selectors.detail(state)

    }),
    {

      setItem: ratingKeyDetailDuck.creators.setItem
    }
  )
)(BehaviorTag)
