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
      {step === 1 && <GroomingFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <GroomingFormWizardSecond onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
      {step === 3 && <GroomingFormWizardThird onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
