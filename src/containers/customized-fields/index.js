import React, { useState } from 'react'
import { Button, Checkbox, Dropdown, Icon, Grid, Header, Form, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Message from '@components/Message'

import './styles.scss'

const CustomizedFields = () => {
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Client')

  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' className='cls-MainHeader'>Customized Fields</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>

          </Grid.Column>
        </Grid>
        <div className='mv32'>
          <Button
            basic={ActiveInfoItem !== 'Client'} color='blue'
            content='Client Fields' name='Client'
            onClick={_handleInfoItemClick}/>
          <Button
            basic={ActiveInfoItem !== 'Pet'} color='blue'
            content='Pet Fields' name='Pet'
            onClick={_handleInfoItemClick}/>
        </div>

        <Message
          content={
            <Grid padded style={{ marginLeft: -16 }}>
              <Grid.Column className='mb0 pb0' width='16'>
                <div className='message__title'>PetKennect allows you to customize all information you collect about your clients.</div>
              </Grid.Column>
            </Grid>

          } type='warning'/>

        <Form>
          {ActiveInfoItem === 'Client'  && (
            <>
              <Grid className='mt16'>
                <Grid.Column columns={16}  textAlign='right'>
                  <Button color='teal' content='Add Group' icon='plus circle icon'/>
                </Grid.Column>
              </Grid>
              <Grid className='mv8' columns={2}>
                <Grid.Column>
                  <Header as='h2'>Basic information</Header>
                </Grid.Column >
                <Grid.Column textAlign='right'>
                  <Button color='teal'  content='Add Field' icon='plus circle icon'/>
                  <Button
                    basic icon='edit outline'/>
                  <Button
                    basic icon='trash alternate outline'/>
                </Grid.Column>
              </Grid>
              <div className='c-note-item wrapper'>
                <div className='flex justify-between align-center'>
                  <div className='thumbnail-wrapper w15'>
                    <div>
                      <div className='thumbnail-tit le'>Email&nbsp;&nbsp;<Icon name='lock'/></div>
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      options={[
                        { key: 1, value: 'textbox', text: 'Textbox' },
                        { key: 2, value: 'checkbox', text: 'Checkbox' },
                        { key: 3, value: 'radio', text: 'Radio' }
                      ]}
                      placeholder='All'
                      selection
                      value={'textbox'}/>
                  </div>
                  <div className='permission-checkbox'>
                    <Checkbox label='Required'/><br/>
                    <Checkbox label='Editable by Client'/><br/>
                    <Checkbox label='Editable by Employee'/><br/>
                    <Checkbox label='Visible by Client'/>
                  </div>
                  <div>
                    <Button
                      basic
                      className='ml16' icon
                      size='small'>
                      <Icon name='edit outline'/>
                    </Button>
                    <Button
                      basic
                      color='red' icon
                      size='small'>
                      <Icon name='trash alternate outline'/>
                    </Button>
                  </div>
                </div>
              </div>
              <div className='c-note-item wrapper'>
                <div className='flex justify-between align-center'>
                  <div className='thumbnail-wrapper w15'>
                    <div>
                      <div className='thumbnail-tit le'>First Name&nbsp;&nbsp;<Icon name='lock'/></div>
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      options={[
                        { key: 1, value: 'textbox', text: 'Textbox' },
                        { key: 2, value: 'checkbox', text: 'Checkbox' },
                        { key: 3, value: 'radio', text: 'Radio' }
                      ]}
                      placeholder='All'
                      selection
                      value={'textbox'}/>
                  </div>
                  <div className='permission-checkbox'>
                    <Checkbox label='Required'/><br/>
                    <Checkbox label='Editable by Client'/><br/>
                    <Checkbox label='Editable by Employee'/><br/>
                    <Checkbox label='Visible by Client'/>
                  </div>
                  <div>
                    <Button
                      basic
                      className='ml16' icon
                      size='small'>
                      <Icon name='edit outline'/>
                    </Button>
                    <Button
                      basic
                      color='red' icon
                      size='small'>
                      <Icon name='trash alternate outline'/>
                    </Button>
                  </div>
                </div>
              </div>

              <Grid className='mv8 mt16' columns={2}>
                <Grid.Column>
                  <Header as='h2'>Emergency contact</Header>
                </Grid.Column >
                <Grid.Column textAlign='right'>
                  <Button color='teal'  content='Add Field' icon='plus circle icon'/>
                  <Button
                    basic icon='edit outline'/>
                  <Button
                    basic icon='trash alternate outline'/>
                </Grid.Column>
              </Grid>
              <div className='c-note-item wrapper'>
                <div className='flex justify-between align-center'>
                  <div className='thumbnail-wrapper w15'>
                    <div>
                      <div className='thumbnail-tit le'>Name&nbsp;&nbsp;<Icon name='lock'/></div>
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      options={[
                        { key: 1, value: 'textbox', text: 'Textbox' },
                        { key: 2, value: 'checkbox', text: 'Checkbox' },
                        { key: 3, value: 'radio', text: 'Radio' }
                      ]}
                      placeholder='All'
                      selection
                      value={'textbox'}/>
                  </div>
                  <div className='permission-checkbox'>
                    <Checkbox label='Required'/><br/>
                    <Checkbox label='Editable by Client'/><br/>
                    <Checkbox label='Editable by Employee'/><br/>
                    <Checkbox label='Visible by Client'/>
                  </div>
                  <div>
                    <Button
                      basic
                      className='ml16' icon
                      size='small'>
                      <Icon name='edit outline'/>
                    </Button>
                    <Button
                      basic
                      color='red' icon
                      size='small'>
                      <Icon name='trash alternate outline'/>
                    </Button>
                  </div>
                </div>
              </div>
              <div className='c-note-item wrapper'>
                <div className='flex justify-between align-center'>
                  <div className='thumbnail-wrapper w15'>
                    <div>
                      <div className='thumbnail-tit le'>Relation&nbsp;&nbsp;<Icon name='lock'/></div>
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      options={[
                        { key: 1, value: 'textbox', text: 'Textbox' },
                        { key: 2, value: 'checkbox', text: 'Checkbox' },
                        { key: 3, value: 'radio', text: 'Radio' }
                      ]}
                      placeholder='All'
                      selection
                      value={'textbox'}/>
                  </div>
                  <div className='permission-checkbox'>
                    <Checkbox label='Required'/><br/>
                    <Checkbox label='Editable by Client'/><br/>
                    <Checkbox label='Editable by Employee'/><br/>
                    <Checkbox label='Visible by Client'/>
                  </div>
                  <div>
                    <Button
                      basic
                      className='ml16' icon
                      size='small'>
                      <Icon name='edit outline'/>
                    </Button>
                    <Button
                      basic
                      color='red' icon
                      size='small'>
                      <Icon name='trash alternate outline'/>
                    </Button>
                  </div>
                </div>
              </div>

            </>
          )}
        </Form>
      </Segment>

    </Layout>
  )
}

export default CustomizedFields
