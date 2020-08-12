import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import ClientFormWizardFirst from './first'
import ClientFormWizardSecond from './second'
import { formId } from './../'

const ClientFormWizard = props => {
  const [ step, setStep ] = useState(1)

  useEffect(() => {
    return () => {
      props.dispatch(destroy(formId))
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
      {step === 1 && <ClientFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <ClientFormWizardSecond onPreviousStep={_handlePreviousStep}/>}
    </>
  )
}

export default connect()(ClientFormWizard)
