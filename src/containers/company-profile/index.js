import React from 'react'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import './styles.scss'
const SetupCompanyProfile = () => {
  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

      </Segment>
    </Layout>
  )
}

export default SetupCompanyProfile