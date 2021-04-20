import React, { useState } from 'react'

import { Grid, Header } from 'semantic-ui-react'
import BreedManagementTable from './breed-manager-table'

const EditBreed = ()=>{
  const [ alphaFilter, setAlphaFilter ] = useState('')

  const filter_alphabets = [ 'A','B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T','U',
    'V', 'W','X', 'Y', 'Z' ]

  return (

    <>
      <Grid>
        <Grid.Column computer={16}>
          <Header as='h4' color='teal' >Edit Breeds in your facilities:</Header>
        </Grid.Column>
        <Grid.Column computer={16}>
          <Header as='h4'>AKC Standard breeds are loaded. Any breed that is mixed is noted with {'"-X"'}. you can add breeds or edit them here. </Header>
        </Grid.Column>

      </Grid>
      <Grid>
        <Grid.Column computer={16} textAlign='center'>
          {
            filter_alphabets &&  filter_alphabets.map((item,index)=>{
              return (

                <Header
                  as='h3'
                  color='teal'
                  disabled={!(item === alphaFilter)}
                  key={index} onClick={()=>{setAlphaFilter(item)}}
                  style={{ display: 'inline-block', marginRight: '1rem' }}>{item}
                </Header>

              )
            })
          }
          <Header
            as='h3'  color='blue' onClick={()=>{setAlphaFilter('view_all')}}
            style={{ display: 'inline-block', marginRight: '1rem' }} >View All</Header>
        </Grid.Column>
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
