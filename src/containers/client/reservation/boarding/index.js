import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import BoardingFormWizardFirst from './first'
import BoardingFormWizardSecond from './second'
import BoardingFormWizardThird from './third'

import { boardingFormId } from './first'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  useEffect(() => {
    return () => {
      props.dispatch(destroy(boardingFormId))
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
      {step === 1 && <BoardingFormWizardFirst onNextStep={_handleNextStep}/>}
      {step === 2 && <BoardingFormWizardSecond onNextStep={_handleNextStep} onPreviousStep={_handlePreviousStep}/>}
      {step === 3 && <BoardingFormWizardThird onNextStep={_handleNextStep} onPreviousStep={_handlePreviousStep} serviceType={props.serviceType}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
