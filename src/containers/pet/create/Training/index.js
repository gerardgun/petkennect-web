import  React, { useState }  from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import TrainingPackage from './packageForm'
import TrainingPerformance from './performanceForm'
const TrainingForm = () => {
  const  [ state,setState ] = useState('package')

  const _handleBtnClick = ((e,{ value }) =>{
    setState(value)
  })

  return (
    <Segment className='segment-content segment-menu-group' padded='very'>
      <Button

        basic={state !== 'package'} color='teal'
        content='Training Package' onClick={_handleBtnClick}
        value='package'/>

      {state === 'package' &&  <Button

        className='performance-save-bt'
        color='teal'
        content='Save'
        onClick=''
        type='button'/>}
      <Button
        basic={state !== 'performance'}
        className='training-performance-button' color='teal'
        content='Training Performance' onClick={_handleBtnClick}
        value='performance'/>

      {state === 'package' && <TrainingPackage/>}
      {state === 'performance' && <TrainingPerformance/>}

    </Segment>)
}

export default  compose(
  connect(() => {

  })

)(TrainingForm)
