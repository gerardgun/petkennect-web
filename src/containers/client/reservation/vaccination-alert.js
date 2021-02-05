import React  from 'react'
import { Grid } from 'semantic-ui-react'
import Message from '@components/Message'

const VaccinationAlert = () => {
  return (

    <Message
      className='vaccination-alert'
      content={
        <Grid padded style={{ marginLeft: -16 }}>
          <Grid.Column className='mb0 pb0' width='16'>
            <div className='message__title'>Pet vaccinations are out of date</div>
          </Grid.Column>
          <Grid.Column width='16'>
            <Grid>
              <Grid.Column>
                <div  className='message__title'>This pet does not have an updated vaccine</div>
              </Grid.Column>
            </Grid>

          </Grid.Column>
        </Grid>

      }
      type='warning'/>

  )
}

export default VaccinationAlert
