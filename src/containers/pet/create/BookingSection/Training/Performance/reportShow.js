import React  from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import trainingPackageDuck from '@reducers/training-package'
import { Container, Button, Grid } from 'semantic-ui-react'
import loadable from '@loadable/component'

import config from '@lib/constants/list-configs/training-package'

import './style.scss'

const Table = loadable(() => import('@components/Table'))

const ReportShow = ()=>{
  return (
    <Container className='c-booking' fluid>
      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={4} mobile={10} tablet={4}>

        </Grid.Column >
        <Grid.Column
          className='ui-grid-align'
          computer={12} mobile={10} tablet={12}>
          <Button
            color='teal'
            content='New Report'
            onClick=''/>
        </Grid.Column>
      </Grid>
      <Table
        config={config}
        duck={trainingPackageDuck}
        onOptionClick=''
        onRowClick=''/>
    </Container>

  )
}

export default  compose(
  connect(() => {

  })

)(ReportShow)
