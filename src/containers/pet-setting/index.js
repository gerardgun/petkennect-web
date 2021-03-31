import React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'
// import PetKind fro../animal-setting/pet-kindind'
import PetBreed from './pet-breed'
import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))

const PetSetting = ()=>{
  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Pet Settings</Header>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column
            className='search-width'
            computer={6} mobile={14} tablet={8}>
            {/* <PetKind/> */}
          </Grid.Column>
          <Grid.Column
            className='search-width'
            computer={8} mobile={14} tablet={8}>
            <PetBreed/>
          </Grid.Column>
        </Grid>
      </Segment>

    </Layout>

  )
}

export default PetSetting
