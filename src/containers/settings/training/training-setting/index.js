import React, { useState } from 'react'
import {  Grid, Header, Segment, Button } from 'semantic-ui-react'
import Switch from 'react-switch'
import RatingKeyTable from './rating-key'
import  '../styles.scss'

const TrainingSetting = ()=>{
  const [ trainingRating, setTrainingRating ] = useState(true)
  const [ questionnaire,setQuestionnaire ] = useState(true)

  return (
    <Segment className='segment-content-no-border'>
      <Grid>
        <Grid.Column   className='training-heading' computer={11}>
          <Header as='h4' className='training-head-m' color='teal'>Enable Client Training Questionnaire</Header>

          {/* <Checkbox toggle/> */}
          <Switch
            checked={trainingRating}
            className='react-switch'
            height={30}
            onChange={()=>{setTrainingRating(!trainingRating)}}
            onColor='#00aa9f'
            width={60}/>
        </Grid.Column>

        <Grid.Column className='pt0 pb0 pl32 pr0'computer={5}>
          <Button
            basic
            className='mt12'
            color='teal'
            content='Customize Form'
            floated='left'/>
        </Grid.Column>

      </Grid>
      <Grid>
        <Grid.Column  className='training-heading pb0 pt0' computer={11}>
          <Header as='h4' className='mb0' color='teal'>Enable Training Rating System</Header>

          {/* <Checkbox toggle/> */}
          <Switch
            checked={questionnaire}
            className='react-switch'
            height={30}
            onChange={()=>{setQuestionnaire(!questionnaire)}}
            onColor='#00aa9f'
            width={60}/>
        </Grid.Column>

      </Grid>
      <Grid>
        <Grid.Column className='pt0'><span><b>
        Assign ratings to your training commands to track performance and create logs for training.</b>
        </span>
        <br/>
        <span>
          <b>
          These are viewable to employee unless sent to clients.</b>
        </span></Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column  computer={15}>
          <RatingKeyTable/>
        </Grid.Column>
      </Grid>
    </Segment>

  )
}

export default TrainingSetting
