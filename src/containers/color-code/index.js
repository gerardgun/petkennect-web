import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, Header, Segment, Input, Button, Icon, Table, Menu, Dropdown, Breadcrumb, Divider, Checkbox } from 'semantic-ui-react'
import { BiTennisBall } from 'react-icons/bi'
import { GiJumpingDog, GiDamagedHouse, GiDogBowl, GiSittingDog } from 'react-icons/gi'

import loadable from '@loadable/component'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'

import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))

const ColourCodeList = () => {
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('system')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const [ activeMenuItem, setActiveMenuItem ] = useState('client')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const clientIconOptions = [
    { key: 1, value: 'user', text: (<p style={{ height: '13.6px' }}><Icon name='user circle' style={{ color: 'grey', fontSize: '20px' }}></Icon></p>)  }
  ]

  const miscellaneousIconOptions = [
    { key: 1, value: 'bus', text: (<p style={{ height: '13.6px' }}><Icon name='bus' style={{ color: 'grey', fontSize: '20px' }}></Icon></p>)  }
  ]

  const petIconOptions = [
    { key: 1, value: 'paw', text: (<p style={{ height: '13.6px' }}><Icon name='paw' style={{ color: 'grey', fontSize: '20px' }}></Icon></p>) }
  ]

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile pb32'>
        <Grid className='segment-content-header'>
          <Grid.Column
            className='pb0' computer={16} mobile={16}
            tablet={16}>
            <Header as='h2'>System Icons/Codes</Header>
            <Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup'>Application Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/color-codes'>System Icons {'&'} codes</Link>
              </Breadcrumb.Section>
            </Breadcrumb>
            <Divider/>
          </Grid.Column>
          <Grid.Column computer={16}>
            <div className='container-color'>
              <Header as='h3' className='mr20 mb0' color='teal'>Enable Icons for Application</Header>
              {/* </Grid.Column> */}
              {/* <Grid.Column className='pl0' computer={1}> */}
              <div  className='sytem-icon-toggle-div'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  name='system_icon'
                  toggle
                  type='checkbox'/>
              </div>

            </div>

          </Grid.Column>
        </Grid>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column
            computer={8} mobile={16} tablet={10}>
            <Button
              basic={ActiveInfoItem !== 'system'}
              className='w120'
              color='teal'
              content='System'
              name='system'
              onClick={_handleInfoItemClick}/>
            <Button
              basic={ActiveInfoItem !== 'custom'}
              className='w120'
              color='teal'
              content='Custom'
              name='custom'
              onClick={_handleInfoItemClick}/>
          </Grid.Column>
          { ActiveInfoItem === 'custom' && (
            <Grid.Column
              className='save-button-align'
              computer={8} mobile={7} tablet={6}>
              <Button
                className='w120'
                color='teal'
                content='Save'
                floated='right'/>
            </Grid.Column>)
          }
        </Grid>
        <Grid
          className='mh12' computer={16} mobile={16}
          tablet={16}>
          {ActiveInfoItem === 'system'  && (
            <>
              <Table
                className='mt16 p0' selectable
                sortable unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ICON</Table.HeaderCell>
                    <Table.HeaderCell className='system-description-width'>DESCRIPTION</Table.HeaderCell>
                    <Table.HeaderCell>APPLIES TO</Table.HeaderCell>
                    <Table.HeaderCell >RULES</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body className='description-width'>
                  <>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='dollar sign' style={{ color: 'green', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell className='description-width'><p>Account Credit</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell ><p>1000</p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='dollar sign' style={{ color: 'red', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell className='description-width'><p>Balance Due</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell ><p>200</p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='warning' style={{ color: 'dodgerBlue', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell className='description-width'><p>Owner Follow Up Notes</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='credit card' style={{ color: 'blue', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell className='description-width'><p>Credit Card on File</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='percent' style={{ color: 'dodgerBlue', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Client Discount Pricing</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell><p>20</p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='star' style={{ color: 'dodgerBlue', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Client First Reservation</p></Table.Cell>
                      <Table.Cell><p>Client</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='medkit' style={{ color: 'red', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Missing or Expired</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='medkit' style={{ color: 'yellow', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Coming Due</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p>{'Expiration <= 2 weeks'}</p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='medkit' style={{ color: 'green', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Current</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='warning' style={{ color: 'red', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Incidents</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p style={{ height: '13.6px' }}><Icon name='picture' style={{ color: 'dodgerBlue', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Photo on File</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell><p  style={{ height: '13.6px' }}><Icon name='birthday cake' style={{ color: 'brown', fontSize: '20px' }}></Icon></p></Table.Cell>
                      <Table.Cell><p>Birthday</p></Table.Cell>
                      <Table.Cell><p>Pet</p></Table.Cell>
                      <Table.Cell><p></p></Table.Cell>
                    </Table.Row>
                  </>
                </Table.Body>
              </Table>
            </>)
          }

          {ActiveInfoItem === 'custom'  && (
            <>
              <Grid>
                <Grid.Column
                  className='petkennect-profile-sidebar p16 menuItem-margin'
                  computer={4} mobile={12} tablet={9}>
                  <Menu
                    className='petkennect-profile-menu' color='teal' fluid
                    vertical>
                    <Menu.Item
                      active={activeMenuItem === 'client'} link name='client'
                      onClick={_handleMenuItemClick}>
                      Client
                    </Menu.Item>
                    <Menu.Item
                      active={activeMenuItem === 'pet'} link name='pet'
                      onClick={_handleMenuItemClick}>
                      Pet
                    </Menu.Item>
                    <Menu.Item
                      active={activeMenuItem === 'miscellaneous'} link name='miscellaneous'
                      onClick={_handleMenuItemClick}>
                      Miscellaneous
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column
                  className='petkennect-profile-body table-scroll'
                  computer={12} mobile={16} tablet={16}>
                  {activeMenuItem === 'client'  && (
                    <>
                      <Table
                        basic='very' className='table-primary mh12' selectable
                        sortable unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell className='dropdown-width'>ICON</Table.HeaderCell>
                            <Table.HeaderCell className='dropdown-width'>COLOR</Table.HeaderCell>
                            <Table.HeaderCell className='description-field-width'>DESCRIPTION</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body className='description-width'>
                          <>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor1'
                                required/></Table.Cell>
                              <Table.Cell ><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor2'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor3'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor4'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor5'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor6'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor7'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor8'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor9'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='clientColor10'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                          </>
                        </Table.Body>
                      </Table>
                    </>
                  )}
                  {activeMenuItem === 'pet'  && (
                    <>
                      <Table
                        basic='very' className='table-primary mh12' selectable
                        sortable unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell className='dropdown-width'>ICON</Table.HeaderCell>
                            <Table.HeaderCell className='dropdown-width'>COLOR</Table.HeaderCell>
                            <Table.HeaderCell className='description-field-width'>DESCRIPTION</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body className='description-width'>
                          <>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiSittingDog/></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style green-color'><span>#188B07</span><Icon
                                circular className='margin-icon'
                                inverted
                                name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Received Training</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><BiTennisBall/></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style orange-color'><span>#F88C05</span><Icon
                                circular className='margin-icon'
                                inverted name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Toy Aggressive</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiDogBowl/></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style orange-color'><span>#F88C05</span><Icon
                                circular className='margin-icon'
                                inverted name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Food Aggressive</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiDamagedHouse/></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style red-color'><span>#E90E0E</span><Icon
                                circular className='margin-icon'
                                inverted name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Broke House</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiJumpingDog/></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style red-color'><span>#E90E0E</span><Icon
                                circular className='margin-icon'
                                inverted name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Fence Jumping</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='lightning boltnis' style={{ color: 'grey', fontSize: '20px' }}></Icon></p></Table.Cell>
                              <Table.Cell><div className='box-style yellow-color'><span>#EFF30A</span><Icon
                                background-color='#EFF30A' circular className='margin-icon'
                                inverted name='eye dropper'/></div></Table.Cell>
                              <Table.Cell className='description-width'><p>Afraid of Thunderstorm</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='petColor1'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='petColor2'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='petColor3'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='petColor4'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='petColor5'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                          </>
                        </Table.Body>
                      </Table>
                    </>
                  )}
                  {activeMenuItem === 'miscellaneous'  && (
                    <>
                      <Table
                        basic='very' className='table-primary mh12' selectable
                        sortable unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell className='dropdown-width'>ICON</Table.HeaderCell>
                            <Table.HeaderCell className='dropdown-width'>COLOR</Table.HeaderCell>
                            <Table.HeaderCell className='description-field-width'>DESCRIPTION</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body className='description-width'>
                          <>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor1'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor2'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor3'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor4'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor5'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor6'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor7'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row><Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor8'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor9'
                                required/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor10'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Field
                                autoComplete='off'
                                component={FormField}
                                control={InputColor}
                                name='miscColor11'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                          </>
                        </Table.Body>
                      </Table>
                    </>
                  )}
                </Grid.Column>
              </Grid>
            </>)
          }
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    () => {
      return {
        initialValues: { petColor01: '#188B07', petColor02: '#F88C05', petColor03: '#F88C05', petColor04: '#E90E0E',
          petColor05: '#E90E0E', petColor06: '#EFF30A' }
      }
    }),
  reduxForm({
    form              : 'color-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ColourCodeList)
