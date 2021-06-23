import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'
import { defaultImageUrl } from '@lib/constants'
import { Carousel } from 'react-responsive-carousel'
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
      <Grid.Column className='alice-slider slider-button-size pt0' width={16}>
        <div style={{ width: '100%', height: '260px', 'margin-left': 'auto', 'margin-right': 'auto' }}>
          <div className='carousel-wrapper slider-button'>
            <Carousel
              centerMode
              centerSlidePercentage={34}
              dynamicHeight={true}
              showArrows={true}
              showThumbs={false} swipeable={true}>

              <div className='pl0 pr12 pt20 pb20'>
                <img className='div-image-report-slide' height='220px'  src='/images/dogboarding.png'/>
              </div>
              <div className='pl12 pr8 pt20 pb20'>
                {/* {props.pets.items.find((_) => _.id === 79) && props.pets.items.find((_) => _.id === 79).image_filepath} */}
                <img className='div-image-report-slide' height='220px' src='/images/DogDaycare_Color.png'/>
              </div>
              <div className='pl12 pr8 pt20 pb20'>
                <img className='div-image-report-slide' height='220px' src='/images/hydrobath.png'/>
              </div>
              <div className='pl12 pr8 pt20 pb20'>
                <img height='220px' src={defaultImageUrl}/>
              </div>
              <div className='pl12 pr0 pt20 pb20 '>
                <img className='div-image-report-slide' height='220px' src={defaultImageUrl}/>
              </div>
            </Carousel>
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
