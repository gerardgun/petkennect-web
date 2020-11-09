import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import ProductFormWizardFirst from './first'
import ProductFormWizardSecond from './second'
import { formId } from './../'

const ProductFormWizard = props => {
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
      {step === 1 && <ProductFormWizardFirst onSubmit={_handleNextStep}/>}
      {step === 2 && <ProductFormWizardSecond onPreviousStep={_handlePreviousStep}/>}
    </>
  )
}

export default connect()(ProductFormWizard)
