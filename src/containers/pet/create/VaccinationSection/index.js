import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header , Divider, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import Alert from '@components/Alert'

import useModal from '@components/Modal/useModal'
import VaccinationUploadForm from './VaccinationUploadForm'
import EmailReminderForm from './EmailReminderForm'

import petVaccinationDuck from '@reducers/pet/vaccination'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

function VacinationSection(props) {
  const { petVaccinationDetail , petVaccination } = props

  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()

  useEffect(()=> {
    props.getPetVaccinations()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  const _handleSaveReminderBtnClick = ()=> {
    _handleOpenEmailFormModal()
  }

  const _handleSaveBtnClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(petVaccinationDetail.status)

  return (
    <div className='c-vaccination-section'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Vaccinations
        </Header>

      </div>
      <Divider className='m0'/>
      <Alert className='mh40 mt32' open/>
      <div className='flex justify-end mh40 mt32'>
        <Button
          basic
          color='teal'
          content='Send Reminder'
          disabled={saving || !petVaccination.selector.selected_items.length}
          onClick={_handleSaveReminderBtnClick}
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
          duck={petVaccinationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

      </div>
      <EmailReminderForm onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>

      <VaccinationUploadForm/>
    </div>
  )
}

VacinationSection.propTypes = {  }

VacinationSection.defaultProps = {  }

export default compose(
  connect(
    ({ ...state }) => ({
      petVaccination      : petVaccinationDuck.selectors.list(state),
      petVaccinationDetail: petVaccinationDetailDuck.selectors.detail(state)
    }), {
      getPetVaccinations: petVaccinationDuck.creators.get,
      setItem           : petVaccinationDetailDuck.creators.setItem
    })
)(VacinationSection)

