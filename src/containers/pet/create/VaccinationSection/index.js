import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header , Divider, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import Alert from '@components/Alert'

import VaccinationUploadForm from './VaccinationUploadForm'

import vaccinationDuck from '@reducers/pet/vaccination'
import vaccinationDetailDuck from '@reducers/pet/vaccination/detail'

function VacinationSection(props) {
  const { petVaccinationDetail , petVaccination } = props
  useEffect(()=> {
    props.getVaccinations()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  const _handleCancelBtnClick = ()=> {}
  const _handleSaveBtnClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(petVaccinationDetail.status)

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Vaccinations
        </Header>
        <Header as='h5'>working in progress ...</Header>

      </div>
      <Divider className='m0'/>
      <Alert className='mh40 mt32' open/>
      <div className='flex justify-end mh40 mt32'>
        <Button
          basic
          color='teal'
          content='Send Reminder' disabled={saving}
          onClick={_handleCancelBtnClick}
          size='small'/>
        <Button
          className='ml16'
          color='teal'
          content='Upload'
          disabled={saving || !petVaccination.selector.selected_items.length}
          loading={saving}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={_handleSaveBtnClick}
          size='small'/>
      </div>

      <div className='mh40 mt20'>
        <Table
          duck={vaccinationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

      </div>
      <VaccinationUploadForm/>
    </div>
  )
}

VacinationSection.propTypes = {  }

VacinationSection.defaultProps = {  }

export default compose(
  connect(
    ({ ...state }) => ({
      petVaccination      : vaccinationDuck.selectors.list(state),
      petVaccinationDetail: vaccinationDetailDuck.selectors.detail(state)
    }), {
      getVaccinations: vaccinationDuck.creators.get,
      setItem        : vaccinationDetailDuck.creators.setItem
    })
)(VacinationSection)

