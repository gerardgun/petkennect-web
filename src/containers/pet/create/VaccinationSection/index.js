import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header , Grid, Button, Container } from 'semantic-ui-react'
import { compose } from 'redux'
import moment from 'moment'
import loadable from '@loadable/component'

import useModal from '@components/Modal/useModal'
import petVaccinationListConfig from '@lib/constants/list-configs/pet/vaccination'

import petVaccinationDuck from '@reducers/pet/vaccination'
import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

const Table = loadable(() => import('@components/Table'))
const Alert = loadable(() => import('@components/Alert'))
const  VaccinationUploadForm = loadable(() => import('./VaccinationUploadForm'))
const EmailReminderForm = loadable(() => import('./EmailReminderForm'))

function VacinationSection(props) {
  const { petVaccinationDetail , petVaccination , petDetail } = props

  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()

  const { pet: petId } = useParams()

  useEffect(()=> {
    props.getPetVaccinations()
  }, [ ])

  useEffect(()=> {
    if(petVaccinationDetail.status === 'POSTED' || petVaccinationDetail.status === 'SENT') {
      props.getPet(petId)
      props.getPetVaccinations()
    }
  }, [ petVaccinationDetail.status ])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowButtonClick = () => {
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
    <Container className='c-vaccination-section' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Vaccinations</Header>
        </Grid.Column>
      </Grid>
      <Alert
        className='mh28 mt32' message={getAlertMessage()}
        open={petDetail.item.vaccination_alert && !!petDetail.item.vaccination_alert.length}/>
      <div className='flex justify-end mh28 mt32'>
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

      <div className='mh28 mt20'>
        <Table
          config={petVaccinationListConfig}
          duck={petVaccinationDuck}
          onRowButtonClick={_handleRowButtonClick}
          onRowClick={_handleRowClick}/>

      </div>
      <EmailReminderForm onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>

      <VaccinationUploadForm/>
    </Container>
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
