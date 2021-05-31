import React from 'react'
import { Grid } from 'semantic-ui-react'

import Notification from './notification'
import Calendar from './calendar'
import Tasklist from './task-list'
import './../dashboard.scss'

const Second = (props) => {
  return (
    <>
      <Grid className='mh0 mb20' width={16}>
        <Grid.Column className='p0' style={{ width: '29%' }}>
          <Notification/>
        </Grid.Column>
        <Grid.Column className='pt0 pb0' style={{ width: '43%' }}>
          <Calendar hideSidebar={props.hideSidebar}/>
        </Grid.Column>
        <Grid.Column className='p0' style={{ width: '28%' }}>
          <Tasklist/>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Second

