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
import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'
import { useParams } from 'react-router-dom'
import moment from 'moment'

function VacinationSection(props) {
  const { petVaccinationDetail , petVaccination , petDetail } = props

  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()

  const { id } = useParams()

  useEffect(()=> {
    props.getPetVaccinations()
  }, [ ])

  useEffect(()=> {
    if(petVaccinationDetail.status === 'POSTED' || petVaccinationDetail.status === 'SENT_EMAIL') {
      props.getPet(id)
      props.getPetVaccinations()
    }
  }, [ petVaccinationDetail.status ])

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

  const getAlertMessage = () => {
    if(!(petDetail.item.vaccination_alert || []).length)
      return  ''

    return `The last reminder was sent on ${
      moment(petDetail.item.vaccination_alert[0].notified_at).format('MM/DD/YYYY HH:mm')
    } for ${petDetail.item.vaccination_alert.map(({ type_name })=> type_name).join(', ')} vaccines.`
  }

  return (
    <div className='c-vaccination-section'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Vaccinations
        </Header>

      </div>
      <Divider className='m0'/>
      <Alert
        className='mh40 mt32' message={getAlertMessage()}
        open={!!petDetail.item.vaccination_alert.length}/>
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
      petVaccinationDetail: petVaccinationDetailDuck.selectors.detail(state),
      petDetail           : petDetailDuck.selectors.detail(state)

    }), {
      getPetVaccinations: petVaccinationDuck.creators.get,
      getPet            : petDetailDuck.creators.get,
      setItem           : petVaccinationDetailDuck.creators.setItem
    })
)(VacinationSection)

