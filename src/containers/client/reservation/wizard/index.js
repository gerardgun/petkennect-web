import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import ReservationFormWizardFirst from './first'
import ReservationFormWizardSecond from './second'
import ReservationFormWizardThird from './third'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  useEffect(() => {
    return () => {
      props.dispatch(destroy('reservation-form'))
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
      {step === 1 && <ReservationFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <ReservationFormWizardSecond onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
      {step === 3 && <ReservationFormWizardThird onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
