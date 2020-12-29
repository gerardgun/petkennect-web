import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import TrainingFormWizardFirst from './first'
import TrainingFormWizardThird from './third'

import { trainingFormId } from './first'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  const [ selectedWeek, setSelectedWeek ] = useState([])
  useEffect(() => {
    return () => {
      props.dispatch(destroy(trainingFormId))
    }
  }, [])

  const _handleNextStep  = allSelectedWeek => () => {
    setSelectedWeek(allSelectedWeek)
    setStep(step + 1)
  }

  const _handlePreviousStep = () => {
    setStep(step - 1)
  }

  return (
    <>
      {step === 1 && <TrainingFormWizardFirst onNextStep={_handleNextStep}/>}
      {step === 2 && <TrainingFormWizardThird
        onNextStep={_handleNextStep} onPreviousStep={_handlePreviousStep} selectedWeek={selectedWeek}
        serviceType={props.serviceType}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
