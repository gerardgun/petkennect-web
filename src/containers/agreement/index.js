import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import loadable from '@loadable/component'
import { useChangeStatusEffect } from '@hooks/Shared'
import agreementListConfig from '@lib/constants/list-configs/agreement'

import agreementDuck from '@reducers/agreement'
import agreementDetailDuck from '@reducers/agreement/detail'

const Layout = loadable(() => import('@components/Common/Layout'))
const Table = loadable(() => import('@components/Table'))
const ModalDelete = loadable(() => import('@components/Modal/Delete'))

const AgreementList = ({ agreement, agreementDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getAgreements, agreementDetail.status)

  useEffect(() => {
    props.getAgreements()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(agreement.selector.selected_items[0], 'DELETE')
  }

  const _handleRowClick = (e, item) => {
    history.push(`/setup/agreement/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Agreements</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              as={Link} color='teal' content='New Agreement'
              to='/setup/agreement/create'/>
          </Grid.Column>
        </Grid>
        <Table
          config={agreementListConfig}
          duck={agreementDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete duckDetail={agreementDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ agreement ,...state }) => ({
      agreement,
      agreementDetail: agreementDetailDuck.selectors.detail(state)

    }), {
      getAgreements: agreementDuck.creators.get,
      setItem      : agreementDetailDuck.creators.setItem
    })
)(AgreementList)
