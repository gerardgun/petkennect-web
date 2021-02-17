import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import TrainingFormWizardFirst from './first'
import TrainingFormWizardSecond from './second'
import TrainingFormWizardThird from './third'

import { trainingFormId } from './first'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  useEffect(() => {
    return () => {
      props.dispatch(destroy(trainingFormId))
    }
  }, [])

  const _handleNextStep  = () => {
    setStep(step + 1)
  }

  const _handlePreviousStep = () => {
    setStep(step - 1)
  }

  return (
    <>
      {step === 1 && <TrainingFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <TrainingFormWizardSecond onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
      {step === 3 && <TrainingFormWizardThird
        onPreviousStep={_handlePreviousStep}
        serviceType={props.serviceType}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
