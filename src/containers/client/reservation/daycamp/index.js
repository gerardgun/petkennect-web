import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import DaycampFormWizardFirst from './first'
import DaycampFormWizardSecond from './second'
import DaycampFormWizardThird from './third'

import { daycampFormId } from './first'

const ReservationFormWizard = props => {
  const [ step, setStep ] = useState(1)
  useEffect(() => {
    return () => {
      props.dispatch(destroy(daycampFormId))
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
      {step === 1 && <DaycampFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <DaycampFormWizardSecond onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
      {step === 3 && <DaycampFormWizardThird onPreviousStep={_handlePreviousStep} onSubmit={_handleNextStep}/>}
    </>
  )
}

export default connect()(ReservationFormWizard)
