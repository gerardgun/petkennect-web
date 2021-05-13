import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { FieldArray } from 'redux-form'
import loadable from '@loadable/component'
import '../styles.scss'
const MultipleCategory = loadable(() => import('./multiple-category'))

const MainCatgory = ({ ...props })=>{
  const {
    categoryData
  } = props

  return (
    <>
      <Grid>
        <Grid.Column computer={16}>
          <Header as='h3' content='Main Section Customizable Fields'/>
        </Grid.Column>
      </Grid>
      <FieldArray
        categoryData={categoryData} component={MultipleCategory}
        name='category'/>
    </>
  )
}

export default MainCatgory
