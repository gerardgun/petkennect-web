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
    <Grid className='sidebar-grid-display mh0'>
      <Grid.Column className='image-line-div pr0 pb0' computer={16}>
        <div className='modal-horizontal-div-line'></div>
        <span style={{ color: props.textColor, fontSize: '20px', marginRight: '13px', marginLeft: '13px' }}><b>MY PHOTOS</b></span>
        <div className='modal-horizontal-div-line'></div>
      </Grid.Column>
      <Grid.Column className='pt0' width={16}>
        <div style={{ width: '100%', height: '220px', 'margin-left': 'auto', 'margin-right': 'auto' }}>
          <div className='image-display'>
            <div className='pl4 pr12 pt20 pb20'>
              <img
                className='div-image-report-slide' height='160px' src='/images/hydrobath.png'
                width='200px'/>
            </div>
            <div className='pl20 pr12 pt20 pb20'>
              {/* {props.pets.items.find((_) => _.id === 79) && props.pets.items.find((_) => _.id === 79).image_filepath} */}
              <img
                className='div-image-report-slide' height='160px' src='/images/dogboarding.png'
                width='200px'/>
            </div>
            <div className='pl20 pr12 pt20 pb20'>
              <img
                className='div-image-report-slide' height='160px' src='/images/DogDaycare_Color.png'
                width='200px'/>
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
