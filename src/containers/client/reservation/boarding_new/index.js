import React from 'react'

import PetCard from '@components/PetCard'
import SelectOption from '@components/SelectOption'

function NewBoarding() {
  return (
    <div className='boarding-container'>
      {/* First Section Location */}
      <div className='boarding-section'>
        <h1 className='title_test'>Select Location, Service Type, and Pets</h1>
        <div className='section-body select-petcards'>
          <SelectOption defaul_option='Select Location'/>
          <SelectOption defaul_option='Select Service Type'/>
          <div className='info-pets'>
            <div className='pet-cards'>
              <PetCard image_url='/images/pets_img/dog_1.jpg' name='Boots, 45lbs'/>
              <PetCard image_url='/images/pets_img/dog_2.jpg' name='Fizz, 17lbs'/>
              <PetCard image_url='/images/pets_img/dog_3.jpg' name='Sylas, 60lbs'/>
              <PetCard image_url='/images/pets_img/dog_4.jpg' name='Jinx, 34lbs'/>
            </div>
            <div className='boarding-reservation'>
              <h3>On Reservation</h3>
              <p>Boots</p>
              <p>Sylas</p>
            </div>
          </div>
        </div>
      </div>
      {/* Second Section Dates */}
      <div  className='boarding-section'>
        <h1 className='title_test'>Select Dates</h1>
        <div className='section-body'>
          <div>
            <p>Arriving:</p>
            <input type='date'/>
            <input type='time'/>
            <label>
              <input type='checkbox'/>
                        +Special Drop Off
            </label>
            <label>
              <input type='checkbox'/>
                        Add to Waitlist
            </label>
          </div>
          <div>
            <p>Departing:</p>
            <input type='date'/>
            <input type='time'/>
            <label>
              <input type='checkbox'/>
                        +Special Pick Up
            </label>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default NewBoarding
