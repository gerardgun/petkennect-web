import { Field } from 'redux-form'
import React from 'react'
import { Image, Header, Checkbox, Segment, Grid, Radio } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'

const PetReportCard = (item) => (
  <Segment>
    <Header as='h2' className='report-card-header'>
      <Image circular src={item.pet.image_filepath}/>
      <Header.Content>
        <Header as='h6' className='section-header' color='blue'>{item.pet.name}</Header>
        <Header.Subheader>Report</Header.Subheader>
      </Header.Content>
    </Header>

    <Grid className='report-card-radio'>
      {
        item.closedQuestion.map((questionItem, index)=>(
          <Grid.Column
            computer={5} key={index}
            mobile={16} tablet={8}>
            <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
            {
              questionItem.answers.map((answeritem,index)=>(
                <>
                  <Radio key={index} label={`${answeritem.description}`} name={`answer_${questionItem.id}`}/>
                  <br/>
                </>
              ))
            }
          </Grid.Column>
        ))
      }

      {
        item.multipleQuestion.map((questionItem, index)=>(
          <Grid.Column key={index} width={16}>
            <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
            <textarea className='w100' name='staffComments' rows='5'></textarea>
          </Grid.Column>
        ))
      }

      {
        item.openQuestion.map((questionItem, index)=>(
          <Grid.Column key={index} width={16}>
            <Header as='h6' className='section-header' color='blue'>{questionItem.description}</Header>
            {
              questionItem.answers.map((answeritem)=>(
                <>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label={`${answeritem.description}`}
                    name={`${answeritem.id}.checbox_item`}
                    type='checkbox'/>
                </>
              ))
            }
          </Grid.Column>
        ))
      }
    </Grid>
  </Segment>

)

export default PetReportCard
