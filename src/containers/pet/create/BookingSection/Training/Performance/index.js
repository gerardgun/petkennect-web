import  React, { useState }  from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import ReportShow from './reportShow'
import TrainingPerformance from './performanceForm'
import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'
import './style.scss'

const TrainingPerformanceForm = ({ ...props }) => {
  const  [ state,setState ] = useState('performance')

  const _handleBtnClick = ((e,{ value }) =>{
    setState(value)
  })

  const _handleBackBtnClick = () =>{
    props.setItem(null,'DISABLE')
  }

  return (
    <div className='performance-index'>
      <Grid className='segment-content-header' columns={2}>
        <Grid.Column width={16}>
          <Button
            basic={state !== 'report'}
            color='teal' content='Report'
            onClick={_handleBtnClick} style={{ width: '200px' }}
            value='report'/>

          <Button
            basic={state !== 'performance'}
            className='training-performance-button' color='teal'
            content='Training Performance' onClick={_handleBtnClick}  style={{ width: '200px' }}
            value='performance'/>

          <Button
            className='header-performance-report-bt'
            color='teal'
            content='Save Changes'  style={{ 'float': 'right' }}/>
          <Button
            basic
            className='header-performance-report-bt'
            color='teal'
            content='Back' onClick={_handleBackBtnClick}  style={{ 'float': 'right' }}/>

        </Grid.Column>
      </Grid>
      {state === 'report' && <ReportShow/>}
      {state === 'performance' && <TrainingPerformance/>}
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      trainingPackageDetail: petReservationTrainingPackageDetail.selectors.detail(state)
    }),{
      setItem: petReservationTrainingPackageDetail.creators.setItem
    })
)(TrainingPerformanceForm)
