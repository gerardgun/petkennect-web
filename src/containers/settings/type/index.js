import React from 'react'
import { Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'

const SetupCapacityBoardingAreaIndex = () => {
  return (
    <Layout>
      <Segment className='segment-content'>

        <Menu/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityBoardingAreaIndex
