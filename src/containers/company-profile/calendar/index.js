import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'
import companyProfileCalendarListConfig from '@lib/constants/list-configs/company-profile/calendar'
import companyProfileCalendarDuck from '@reducers/company-profile/calendar'
import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'
import Menu from '@containers/company-profile/components/Menu'
import './styles.scss'
import CompanyProfileCalendarFormModal from './create/form/modal'
const Layout = loadable(() => import('@components/Common/Layout'))

const SetupCompanyProfileCalendar = () => {
  const dispatch = useDispatch()
  const detail = useSelector(companyProfileCalendarDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      companyProfileCalendarDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        companyProfileCalendarDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'edit')
      dispatch(
        companyProfileCalendarDetailDuck.creators.setItem(
          reason,
          'UPDATE'
        )
      )
  }

  const _handleActionClick = (action) => {
    if(action === 'create')
      dispatch(
        companyProfileCalendarDetailDuck.creators.setItem(
          null,
          'CREATE'
        )
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Grid.Row>
          <Header as='h2'>Calendar</Header>
          <Table
            config={companyProfileCalendarListConfig}
            duck={companyProfileCalendarDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Grid.Row>
        <CompanyProfileCalendarFormModal/>
      </Segment>
    </Layout>
  )
}

export default SetupCompanyProfileCalendar
