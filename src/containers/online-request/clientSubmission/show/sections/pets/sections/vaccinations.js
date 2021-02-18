import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDuck from '@reducers/pet/vaccination'

function VaccinationSection(props) {
  const {
    petDetail,
    petVaccination
  } = props

  useEffect(() => {
    if(petDetail.status === 'GOT')
      props.getPetVaccinations()
  }, [ petDetail.status ])

  const _handleRowOptionClick = (option, item) => {
    switch (option) {
      case 'view':
        window.open(item.dose.document_path)

        return
      default:
        return
    }
  }

  const vaccinationsToReview = useMemo(() => {
    return petVaccination.items.filter(({ status }) => {
      return [ 'missing', 'expired', 'comming_due' ].includes(status)
    })
  }, [ petVaccination.status ])

  return (
    <Container className='c-vaccination-section' fluid>

      {
        vaccinationsToReview.length > 0 && (
          <Message
            content={`The pet has ${vaccinationsToReview.length} vaccinations that need to be reviewed.`}
            icon='warning circle'
            warning/>
        )
      }

      <div className='mt20'>
        <Table
          duck={petVaccinationDuck}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      petDetail     : petDetailDuck.selectors.detail(state),
      petVaccination: petVaccinationDuck.selectors.list(state)
    }), {
      getPetVaccinations: petVaccinationDuck.creators.get
    })
)(VaccinationSection)

