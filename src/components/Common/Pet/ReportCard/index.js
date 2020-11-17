import { Field } from 'redux-form'
import React from 'react'
import { Image, Header, Checkbox, Segment, Grid, Radio } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'

const PetReportCard = (item) => (
  <Segment>
    <Header as='h2' className='report-card-header'>
      <Image circular src={item.image_filepath}/>
      <Header.Content>
        <Header as='h6' className='section-header' color='blue'>{item.name}</Header>
        <Header.Subheader>Report</Header.Subheader>
      </Header.Content>
    </Header>

    <Grid className='report-card-radio'>
      <Grid.Column  computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>MY PLAYSTYLE</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >
      <Grid.Column computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>MY PERSONALITY</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >
      <Grid.Column computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>MY NAPS</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >
      <Grid.Column computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>MY FAVORITE ACTIVITY</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >
      <Grid.Column computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>MY FRIENDS</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >
      <Grid.Column computer={5} mobile={16} tablet={8}>
        <Header as='h6' className='section-header' color='blue'>YOU SHOULD KNOW I</Header>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
        <Radio label='lorem ipsum dolor sit amet'/>
      </Grid.Column >

      <Grid.Column width={16}>
        <Header as='h6' className='section-header' color='blue'>Staff Comments</Header>
        <textarea className='w100' name='staffComments' rows='5'></textarea>
      </Grid.Column>

      <Grid.Column width={16}>
        <Header as='h6' className='section-header' color='blue'>PRESENTED DOG PERFORMANCE IN </Header>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Barking level'
          name={`${item.id}.barkingLevel`}
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Listens to Staff'
          name={`${item.id}.listensToStaff`}
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Take Social Cues'
          name={`${item.id}.takeSocialCues`}
          type='checkbox'/>
      </Grid.Column>
    </Grid>
  </Segment>

)

export default PetReportCard
