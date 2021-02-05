import React, { useState } from 'react'
import { Field } from 'redux-form'

import FormField from '@components/Common/FormField'
import { Button, Segment, Header, Accordion, Table, Select, Checkbox, Grid, Form, Icon,Dropdown } from 'semantic-ui-react'

function dateToYMD(date) {
  let strArray = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  let d = date.getDate()
  let m = strArray[date.getMonth()]

  return '' + (d <= 9 ? '0' + d : d) + ' ' + m
}

function ReservationCalenderList({ checkIn,checkOut }) {
  let arrDate = [ '' ]
  let area = []
  for (let d = new Date(checkIn); d <= new Date(checkOut); d.setDate(d.getDate() + 1))
    arrDate.push(dateToYMD(d))

  if(arrDate.length > 0)
    area.push('', 'AREA1','AREA2')

  return area.map((areaItem,i) =>{
    return  (
      <>
        <Table.Row>
          {
            arrDate.map((dateItem,j) =>{
              return (
                <>
                  {i == 0 && j == 0
                   &&  <Table.Cell style={{ width: '1rem' }}><span>
                     <Field
                       className='spn-calendar-btn'
                       component={FormField}
                       control={Dropdown}
                       fluid
                       label='Select Area'
                       name='area'
                       options={[
                         { key: 1, value: 1, text: 'Area1' },
                         { key: 2, value: 2, text: 'Area2' },
                         { key: 3, value: 3, text: 'Area3' },
                         { key: 4, value: 4, text: 'Area4' }
                       ]}
                       placeholder='Select Area'
                       selectOnBlur={false}
                       selection/></span></Table.Cell>
                  }
                  {i == 0 && j > 0
                  && <Table.Cell><Button className='btn-reservation-calendar basic' style={{ width: '100%' }} type='button'>{dateItem}</Button></Table.Cell>
                  }
                  {i > 0 && j == 0
    && <><Table.Cell><span className='spn-area'><span>{area[i]}</span><Checkbox label='Select All'/></span></Table.Cell></>
                  }
                  {i > 0 && j > 0
                  && <Table.Cell><Button
                    className='btn-reservation-calendar' primary style={{ width: '100%' }}
                    type='button' ></Button></Table.Cell>
                  }
                </>
              )
            })}
        </Table.Row>
      </>
    )
  })
}

function PetItem({ checkIn , checkOut, item, lodging, clientPet }) {
  const [ activeIndex, setActiveIndex ] = useState(-1)

  const  _handleSelectRecurringDaysClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  let names = []
  if(lodging === true)
    for (let items of item)
      names.push({ name: clientPet.items.find(_pet => _pet.id === items).name })

  return (
    <Segment>
      {
        lodging === true ? (
          <>
            <Grid>
              <Grid.Column>Apply To: {
                names && names.map((item,index)=>{
                  return (
                    <span key={index}>{item.name}{ names && names.length - 1 != index && (', ')} </span>
                  )
                })}</Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column>Type Of Stay: Boarding Package</Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column className='span-margin' width={3}><span>Daily Activity Package:</span></Grid.Column>
              <Grid.Column width={5}>
                <Field
                  component={FormField}
                  control={Select}
                  name={'activityPackage'}
                  options={[
                    { key: 1, value: 1, text: 'Test' }
                  ]}
                  placeholder='Select Activity Package'
                  selectOnBlur={false}/>
              </Grid.Column>
            </Grid>

            <Accordion className='mt32 mv12'>
              <Accordion.Title
                active={activeIndex === 0}
                className='heading-color'
                index={0}
                onClick={_handleSelectRecurringDaysClick}>
                <Header as='h3' className='mb0 section-info-header heading-color ml8'>
                  Select Accomodations for All Pets
                  <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                </Header>
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 0}>
                <div>
                  <Grid className='mt12'>
                    <Grid.Column width={10}>
                      <Header as='h3' className='mb0'>
                    Accomodations for All Pets
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Form.Group>
                        <Field
                          checked={true}
                          className='checkbox-label'
                          component={FormField} control={Checkbox} id='available'
                          name='available'
                          type='checkbox'/>
                        <label htmlFor='available'> Available</label>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Form.Group>
                        <Field
                          checked={true}
                          className='checkbox-label'
                          component={FormField} control={Checkbox} id='occupied'
                          name='occupied'
                          type='checkbox'/>
                        <label htmlFor='occupied'> Occupied</label>
                      </Form.Group>
                    </Grid.Column>
                  </Grid>
                  <div style={{ overflowY: 'auto' }}>
                    <Table
                      basic='very' celled collapsing
                      unstackable>
                      <Table.Body>
                        <ReservationCalenderList checkIn={checkIn} checkOut={checkOut}/>
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion>
          </>)
          : (
            <>
              <Grid>
                <Grid.Column>Apply To: {item.name}</Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column>Type Of Stay: Boarding Package</Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='span-margin' width={3}><span>Daily Activity Package:</span></Grid.Column>
                <Grid.Column width={5}>
                  <Field
                    component={FormField}
                    control={Select}
                    name={`${item.id}.activityPackage`}
                    options={[
                      { key: 1, value: 1, text: 'Test' }
                    ]}
                    placeholder='Select Activity Package'
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>

              <Accordion className='mt32 mv12'>
                <Accordion.Title
                  active={activeIndex === 0}
                  className='heading-color'
                  index={0}
                  onClick={_handleSelectRecurringDaysClick}>
                  <Header as='h3' className='mb0 section-info-header heading-color'>
                    Select Accomodations for {item.name}
                    <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                  </Header>
                </Accordion.Title>

                <Accordion.Content active={activeIndex === 0}>
                  <div>
                    <Grid className='mt12'>
                      <Grid.Column width={10}>
                        <Header as='h3' className='mb0'>
                          Accomodations for {item.name}
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Form.Group>
                          <Field
                            checked={true}
                            className='checkbox-label'
                            component={FormField} control={Checkbox} id='available'
                            name='available'
                            type='checkbox'/>
                          <label htmlFor='available'> Available</label>
                        </Form.Group>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Form.Group>
                          <Field
                            checked={true}
                            className='checkbox-label'
                            component={FormField} control={Checkbox} id='occupied'
                            name='occupied'
                            type='checkbox'/>
                          <label htmlFor='occupied'> Occupied</label>
                        </Form.Group>
                      </Grid.Column>

                    </Grid>

                    {/* <div className='div-kannel-selection'>
                <Header as='h3' className='section-info-header'>What kennel and activity will be for {item.name}</Header>
                <Field
                  component={FormField}
                  control={Select}
                  lebel='kennel'
                  name={`${item.id}.kennel`}
                  options={petKennelOptions}
                  placeholder='Select Kennel'
                  selectOnBlur={false}/>
              </div> */}
                    <div style={{ overflowY: 'auto' }}>
                      <Table
                        basic='very' celled collapsing
                        unstackable>
                        <Table.Body>
                          <ReservationCalenderList checkIn={checkIn} checkOut={checkOut}/>
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion>
            </>)
      }

    </Segment>
  )
}

PetItem.propTypes = {
}

PetItem.defaultProps = { }

export default PetItem
