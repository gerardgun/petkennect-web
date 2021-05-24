import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'
// import { defaultImageUrl } from '@lib/constants'
import petDuck from '@reducers/pet'
import '../../styles.scss'

const Slider = (props) => {
  useEffect(() => {
    props.getPets()
  }, [])

  return (
    <Grid className='sidebar-grid-display'>
      <Grid.Column className='image-line-div' computer={16}>
        <div className='horizontal-div-line'></div>
        <span style={{ color: props.textColor, fontSize: '20px', marginRight: '13px', marginLeft: '13px' }}><b>MY PHOTOS</b></span>
        <div className='horizontal-div-line'></div>
      </Grid.Column>
      <Grid.Column className='pt0' width={16}>
        <div style={{ width: '100%', height: '220px', 'margin-left': 'auto', 'margin-right': 'auto' }}>
          <div className='image-display'>
            <div className='pl4 pr8 pt20 pb20'>
              <img height='160px' src='/images/hydrobath.png' width='160px'/>
            </div>
            <div className='pl12 pr8 pt20 pb20'>
              {/* {props.pets.items.find((_) => _.id === 79) && props.pets.items.find((_) => _.id === 79).image_filepath} */}
              <img height='160px' src='/images/dogboarding.png' width='160px'/>
            </div>
            <div className='pl12 pr8 pt20 pb20'>
              <img height='160px' src='/images/DogDaycare_Color.png' width='160px'/>
            </div>
          </div>
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    state => ({
      pets: petDuck.selectors.list(state)
    }),
    {
      getPets: petDuck.creators.get
    }
  )
)(Slider)
