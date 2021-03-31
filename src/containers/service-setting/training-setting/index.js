import React from 'react'
import {  Grid, Header, Segment, Button } from 'semantic-ui-react'
import Switch from 'react-switch'
import RatingKeyTable from './rating-key'
import  '../styles.scss'

const TrainingSetting = ()=>{
  return (
    <Segment className='segment-content-no-border'>
      <Grid>
        <Grid.Column computer={5}>
          <Header as='h4' color='teal'>Enable Client Training Questionnaire</Header>
        </Grid.Column>
        <Grid.Column computer={1}>
          {/* <Checkbox toggle/> */}
          <Switch
            checked={true}
            className='react-switch'
            height={30}
            onColor='#00aa9f'
            width={60}/>
        </Grid.Column>
        <Grid.Column className='pt0 pb0'computer={4}>
          <Button
            basic
            className='mt12'
            color='teal'
            content='Customize Form'
            floated='right'/>
        </Grid.Column>

      </Grid>
      <Grid>
        <Grid.Column computer={5}>
          <Header as='h4' color='teal'>Enable Training Rating System</Header>
        </Grid.Column>
        <Grid.Column computer={1}>
          {/* <Checkbox toggle/> */}
          <Switch
            checked={true}
            className='react-switch'
            height={30}
            onColor='#00aa9f'
            width={60}/>
        </Grid.Column>

      </Grid>
      <Grid>
        <Grid.Column><span>
        Assign ratings to your training commands to track performance and create logs for training.
        </span>
        <br/>
        <span>
          These are viewable to employee unless sent to clients.
        </span></Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={15}>
          <RatingKeyTable/>
        </Grid.Column>
      </Grid>
    </Segment>

  )
}

export default TrainingSetting
