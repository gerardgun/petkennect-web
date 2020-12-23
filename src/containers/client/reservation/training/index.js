import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy, formValueSelector } from 'redux-form'

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

  const _handleNextStep = () => {
    setStep(step + 1)
    // if(props.isClassExists)
    //   setStep(step + 1)
    // else
    //   setStep(step + 2)
  }

  const _handlePreviousStep = () => {
    setStep(step - 1)
    // if(props.isClassExists)
    //   setStep(step - 1)
    // else
    //   setStep(step - 2)
  }

  return (
    <>
      {step === 1 && <TrainingFormWizardFirst onNextStep={_handleNextStep}/>}
      {step === 2 && <TrainingFormWizardSecond onNextStep={_handleNextStep} onPreviousStep={_handlePreviousStep}/>}
      {step === 3 && <TrainingFormWizardThird onNextStep={_handleNextStep}onPreviousStep={_handlePreviousStep} serviceType={props.serviceType}/>}
    </>
  )
}

export default connect(({ ...state }) => {
  const isClass = formValueSelector(trainingFormId)(state, 'classes_visits')

  return {
    isClassExists: isClass && isClass.find(_ => _.type === 'class') ? true : false
  }
}
)(ReservationFormWizard)
