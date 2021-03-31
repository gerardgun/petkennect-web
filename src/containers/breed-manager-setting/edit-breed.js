import React, { useState } from 'react'

import { Grid, Header } from 'semantic-ui-react'
import BreedManagementTable from './breed-manager-table'

const EditBreed = ()=>{
  const [ alphaFilter, setAlphaFilter ] = useState('')

  const filter_alphabets = [ 'A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U',
    'V', 'W','X', 'Y', 'Z' ]

  return (

    <>
      <Grid className='segment-content-header'>
        <Grid.Column computer={16}>
          <Header as='h3' color='teal' >Edit Breeds in your facilities:</Header>
        </Grid.Column>
        <Grid.Column computer={16}>
          <Header as='h4'>AKC Standard breeds are loaded. Any breed that is mixed is noted with {'"-X"'}. you can add breeds or edit them here. </Header>
        </Grid.Column>

      </Grid>
      <Grid className='segment-content-header'>

        <Grid.Row>
          <Grid.Column className='pr0' style={{ width: '60px' }} >

          </Grid.Column>

          {
            filter_alphabets &&  filter_alphabets.map((item,index)=>{
              return (

                <Grid.Column key={index} style={{ width: '2px' }}>
                  <Header
                    as='h3'
                    className='m0'
                    color='teal' disabled={!(item === alphaFilter)}
                    onClick={()=>{setAlphaFilter(item)}}>{item}</Header>

                </Grid.Column>

              )
            })
          }

          <Grid.Column computer={2}>
            <Header as='h3' color='blue' onClick={()=>{setAlphaFilter('view_all')}} >View All</Header>
          </Grid.Column>

        </Grid.Row>

      </Grid>

      <Grid>
        <Grid.Column computer={16}>
          <BreedManagementTable alphabetFilter={alphaFilter}/>
        </Grid.Column>

      </Grid>
    </>

  )
}

export default EditBreed
