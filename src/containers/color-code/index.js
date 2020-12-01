import React, { useState } from 'react'
import { Grid, Header, Segment, Form, Input, Select, Button, Icon } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

const ColourCodeList = (props) => {
  const {
    error
  } = props
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('clientCodes')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const customerCodeOptions = [
    { key: 1, value: 'active', text: 'Active'  },
    { key: 2, value: 'caution', text: 'Caution'  },
    { key: 3, value: 'declineClient', text: 'Decline Client'  },
    { key: 4, value: 'doNotBook', text: 'Do Not Book' },
    { key: 5, value: 'highMaintenance', text: 'High Maintenance'  },
    { key: 6, value: 'militaryDiscount', text: 'Military Discount' },
    { key: 7, value: 'newClient', text: 'New Client'  },
    { key: 8, value: 'referral', text: 'Referral' },
    { key: 9, value: 'vipClient', text: 'VIP Client' }
  ]

  const petCodeOptions = [
    { key: 1, value: 'active', text: 'Active' },
    { key: 2, value: 'aggressive', text: 'Aggressive' },
    { key: 3, value: 'dogFearful', text: 'Dog Fearful' },
    { key: 4, value: 'friendly', text: 'Friendly' },
    { key: 5, value: 'jumper', text: 'Jumper' },
    { key: 6, value: 'kitten', text: 'Kitten' },
    { key: 7, value: 'puppy', text: 'Puppy' }
  ]

  const dollarOptions = [
    { key: 1, value: 'balance', text: 'Balance' },
    { key: 2, value: 'credit', text: 'Credit' }
  ]

  const statusOptions = [
    { key: 1, value: 'Active', text: 'Active' },
    { key: 2, value: 'InActive', text: 'InActive' }
  ]

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={12} tablet={8}>
            <Header as='h2'>Color Codes</Header>
          </Grid.Column>
        </Grid>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column
            computer={8} mobile={8} tablet={8}>
            <Button
              basic={ActiveInfoItem !== 'clientCodes'}
              className='w140'
              color='teal'
              content='Client Codes'
              name='clientCodes'
              onClick={_handleInfoItemClick}/>
            <Button
              basic={ActiveInfoItem !== 'petCodes'}
              className='w140'
              color='teal'
              content='Pet Codes'
              name='petCodes'
              onClick={_handleInfoItemClick}/>
            <Button
              basic={ActiveInfoItem !== 'dollar'}
              className='w140'
              color='teal'
              content='$ Dollar'
              name='dollar'
              onClick={_handleInfoItemClick}/>
          </Grid.Column>
          <Grid.Column
            computer={8} mobile={12} tablet={8}>
            <Button
              className='w140'
              color='teal'
              content='Save'
              floated='right'/>
          </Grid.Column>
        </Grid>
        <Form className='petkennect-profile-body-content'>
          {ActiveInfoItem === 'clientCodes'  && (
            <>
              <Icon name='user circle' style={{ color: 'gray', fontSize: '80px' }}></Icon>
              <Form.Group>
                <Button
                  className='button-width' color='red' content='1'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='teal' content='2'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='green' content='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='yellow' content='4'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='orange' content='5'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='blue' content='6'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='pink' content='7'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='grey' content='8'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='olive' content='9'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width'
                  color='violet' content='10'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={customerCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
            </>
          )}
          {ActiveInfoItem === 'petCodes'  && (
            <>
              <Icon name='paw circle' style={{ color: 'gray', fontSize: '80px' }}></Icon>
              <Form.Group>
                <Button
                  className='button-width' color='red' content='1'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='teal' content='2'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='green' content='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='yellow' content='4'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='orange' content='5'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='blue' content='6'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='pink' content='7'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='grey' content='8'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='olive' content='9'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width'
                  color='violet' content='10'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={petCodeOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
            </>
          )}
          {ActiveInfoItem === 'dollar'  && (
            <>
              <Icon name='dollar circle' style={{ color: 'gray', fontSize: '80px' }}></Icon>
              <Form.Group>
                <Button
                  className='button-width' color='red' content='1'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='teal' content='2'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='green' content='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='yellow' content='4'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='orange' content='5'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='blue' content='6'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='pink' content='7'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='grey' content='8'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width' color='olive' content='9'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
              <Form.Group>
                <Button
                  className='button-width'
                  color='violet' content='10'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={dollarOptions} placeholder='Select Option' width='3'/>
                <Form.Field
                  component={FormField} control={Select}
                  options={statusOptions} placeholder='Select Status' width='3'/>
                <Form.Field
                  component={FormField} control={Input}
                  placeholder='Enter Description' width='10'/>
              </Form.Group>
            </>
          )}
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

        </Form>
      </Segment>

    </Layout>
  )
}

export default (ColourCodeList)
