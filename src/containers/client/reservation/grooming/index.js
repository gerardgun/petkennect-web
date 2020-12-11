import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import GroomingFormWizardFirst from './first'
import GroomingFormWizardSecond from './second'
import GroomingFormWizardThird from './third'

import { groomingFormId } from './first'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  useEffect(() => {
    return () => {
      props.dispatch(destroy(groomingFormId))
    }
  }, [])

  const _handleNextStep = () => {
    setStep(step + 1)
  }

  const _handlePreviousStep = () => {
    setStep(step - 1)
  }

  return (
    <>
      {step === 1 && <GroomingFormWizardFirst onNextStep={_handleNextStep}/>}
      {step === 2 && <GroomingFormWizardSecond onNextStep={_handleNextStep} onPreviousStep={_handlePreviousStep}/>}
      {step === 3 && <GroomingFormWizardThird onNextStep={_handleNextStep}onPreviousStep={_handlePreviousStep} serviceType={props.serviceType}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
