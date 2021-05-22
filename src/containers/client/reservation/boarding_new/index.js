import React from 'react'

import { InputLabel, InputFront } from '@components/InputOption'
import { PetCardButtons, PetCard } from '@components/PetCard'
import SelectOption from '@components/SelectOption'

function NewBoarding() {
  return (
    <div className='boarding-container'>
      {/* First Section Location */}
      <div className='boarding-section'>
        <h1 className='title_test'>Select Location, Service Type, and Pets</h1>
        <div className='section-body'>
          <SelectOption defaul_option='Select Location'/>
          <SelectOption defaul_option='Select Service Type'/>
          <div className='info-pets'>
            <div className='pet-cards'>
              <PetCardButtons image_url='/images/pets_img/dog_1.jpg' name='Boots, 45lbs'/>
              <PetCardButtons image_url='/images/pets_img/dog_2.jpg' name='Fizz, 17lbs'/>
              <PetCardButtons image_url='/images/pets_img/dog_3.jpg' name='Sylas, 60lbs'/>
              <PetCardButtons image_url='/images/pets_img/dog_4.jpg' name='Jinx, 34lbs'/>
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
          <div className='section-inputs'>
            <InputLabel label='Arriving:' type='date'/>
            <InputLabel label='at' type='time'/>
            <InputFront color='blue' label='+Special Drop Off' type='checkbox'/>
            <InputFront color='red' label='Add to Waitlist' type='checkbox'/>
          </div>
          <div className='section-inputs'>
            <InputLabel label='Departing:' type='date'/>
            <InputLabel label='at' type='time'/>
            <InputFront color='blue' label='+Special Pick Up' type='checkbox'/>
          </div>
        </div>
      </div>
      {/* Third Section Dates */}
      <div  className='boarding-section'>
        <h1 className='title_test'>Select Reservation Type and Activity <span className='required-indicator'>Required</span></h1>
        <div className='section-body'>
          <div className='petcard-select'>
            <PetCard image_url='/images/pets_img/dog_1.jpg' name='Boots, 45lbs'/>
            <div className='select-container1'>
              <SelectOption defaul_option='Select Reservation type'/>
              <div className='select-container2'>
                <SelectOption defaul_option='Select Activity Packages'/>
                <SelectOption defaul_option='Frecuency'/>
              </div>
            </div>
          </div>

          <div className='petcard-select'>
            <PetCard image_url='/images/pets_img/dog_3.jpg' name='Sylas, 60lbs'/>
            <div className='select-container1'>
              <SelectOption defaul_option='Select Reservation type'/>
              <div className='select-container2'>
                <SelectOption defaul_option='Select Activity Packages'/>
                <SelectOption defaul_option='Frecuency'/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Section Dates */}
      <div  className='boarding-section'>
        <h1 className='title_test'>Assing Acomodations <span className='required-indicator'>Required</span></h1>
        <div className='section-body'>
          <div className='petcard-select'>
            <PetCard image_url='/images/pets_img/dog_1.jpg' name='Boots, 45lbs'/>
            <div className='select-container1'>
              <SelectOption defaul_option='Select Reservation type'/>
              <div className='select-container2'>
                <SelectOption defaul_option='Select Activity Packages'/>
                <SelectOption defaul_option='Frecuency'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewBoarding
