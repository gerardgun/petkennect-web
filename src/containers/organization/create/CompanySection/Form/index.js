import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Modal, Step } from 'semantic-ui-react'

import Step1 from './Step1'
import Step2 from './Step2'

import companyDetailDuck from '@reducers/company/detail'

const CompanyForm = props => {
  const {
    companyDetail
  } = props

  const [ step, setStep ] = useState(1)

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const isOpened = useMemo(() => getIsOpened(companyDetail.mode), [ companyDetail.mode ])

  const _handleClose = () => {
    props.resetItem()
    // reset()
  }

  const _handleStep1Submit = () => setStep(2)
  const _handleStep2Back = () => setStep(1)

  return (
    <Modal
      className='form-modal side'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {
          companyDetail.mode === 'CREATE' ? (
            <>
              <Step.Group ordered widths={2}>
                <Step
                  active={step === 1} completed={step > 1}>
                  <Step.Content>
                    <Step.Title>New Company</Step.Title>
                  </Step.Content>
                </Step>
                <Step active={step === 2}>
                  <Step.Content>
                    <Step.Title>Choose Main Admin User</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>

              {
                step === 1 ? (
                  <Step1 onSubmit={_handleStep1Submit}/>
                ) : (
                  <Step2 onBack={_handleStep2Back}/>
                )
              }
            </>
          ) : (
            <div/>
          )
        }
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      companyDetail: companyDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: companyDetailDuck.creators.resetItem
    }
  )
)(CompanyForm)
