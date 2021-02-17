import React, { useState } from 'react'
import { Grid, Header, Segment, Input, Button, Icon, Table, Menu, Dropdown } from 'semantic-ui-react'
import { BiTennisBall } from 'react-icons/bi'
import { GiJumpingDog, GiDamagedHouse, GiDogBowl, GiSittingDog } from 'react-icons/gi'

import loadable from '@loadable/component'

import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))

const ColourCodeList = () => {
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('system')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const [ activeMenuItem, setActiveMenuItem ] = useState('client')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const colorOptions = [
    { key: 1, value: 'red', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'red', fontSize: '20px' }}></Icon> Red</p>) },
    { key: 2, value: 'green', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'green', fontSize: '20px' }}></Icon> Green</p>) },
    { key: 3, value: 'yellow', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'yellow', fontSize: '20px' }}></Icon> Yellow</p>) },
    { key: 4, value: 'dodgerBlue', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'DodgerBlue', fontSize: '20px' }}></Icon> DodgerBlue</p>) },
    { key: 5, value: 'orange', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'orange', fontSize: '20px' }}></Icon> Orange</p>) },
    { key: 6, value: 'pink', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'pink', fontSize: '20px' }}></Icon> Pink</p>) },
    { key: 7, value: 'blue', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'blue', fontSize: '20px' }}></Icon> Blue</p>) },
    { key: 8, value: 'grey', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'grey', fontSize: '20px' }}></Icon> Grey</p>) },
    { key: 9, value: 'olive', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'olive', fontSize: '20px' }}></Icon> Olive</p>) },
    { key: 10, value: 'purple', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'purple', fontSize: '20px' }}></Icon> Purple</p>) },
    { key: 11, value: 'maroon', text: (<p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'maroon', fontSize: '20px' }}></Icon> Maroon</p>) }
  ]

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
      <Segment className='segment-content petkennect-profile'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2'>System Icons/Codes</Header>
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
          <Grid.Column
            className='save-button-align'
            computer={8} mobile={7} tablet={6}>
            <Button
              className='w120'
              color='teal'
              content='Save'
              floated='right'/>
          </Grid.Column>
        </Grid>
        <Grid
          className='mh12' computer={16} mobile={16}
          tablet={16}>
          {ActiveInfoItem === 'system'  && (
            <>
              <Table
                className='table-primary mt16' selectable
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
                      <Table.Cell><p  style={{ height: '13.6px' }}><Icon name='chess queen' style={{ color: 'brown', fontSize: '20px' }}></Icon></p></Table.Cell>
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
                        basic='very' className='table-primary table-width mh12' selectable
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
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell ><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={clientIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
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
                        basic='very' className='table-primary table-width mh12' selectable
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
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'green', fontSize: '20px' }}></Icon> Green</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Received Training</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><BiTennisBall/></Icon></p></Table.Cell>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'orange', fontSize: '20px' }}></Icon> Orange</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Toy Aggressive</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiDogBowl/></Icon></p></Table.Cell>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'orange', fontSize: '20px' }}></Icon> Orange</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Food Aggressive</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiDamagedHouse/></Icon></p></Table.Cell>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'red', fontSize: '20px' }}></Icon> Red</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Broke House</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon style={{ color: 'grey', fontSize: '20px' }}><GiJumpingDog/></Icon></p></Table.Cell>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'orange', fontSize: '20px' }}></Icon> Orange</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Fence Jumping</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='lightning boltnis' style={{ color: 'grey', fontSize: '20px' }}></Icon></p></Table.Cell>
                              <Table.Cell><p style={{ height: '13.6px' }}><Icon name='circle' style={{ color: 'yellow', fontSize: '20px' }}></Icon> Yellow</p></Table.Cell>
                              <Table.Cell className='description-width'><p>Afraid of Thunderstorm</p></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={petIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
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
                        basic='very' className='table-primary table-width mh12' selectable
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
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row><Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
                              <Table.Cell className='description-width'><Input placeholder='Enter Description'/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell><Dropdown options={miscellaneousIconOptions} placeholder='Select Icon'/></Table.Cell>
                              <Table.Cell><Dropdown options={colorOptions} placeholder='Select Color'/></Table.Cell>
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

export default (ColourCodeList)
