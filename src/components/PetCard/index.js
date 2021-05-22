import React from 'react'
import { Image } from 'semantic-ui-react'
import './styles.scss'

function PetCardButtons({ name, image_url }) {
  return (
    <div className='pet-card-button'>
      <div className='pet-info-container'>
        <div className='image-container'>
          <Image
            centered circular className='pet-avatar'
            src={image_url}/>
        </div>
        <div className='pet-info-icons'>
          <p className='pet-name'>{name}</p>
          <p className='pet-breed'>Mixed Breed</p>
          <div>
            <img/>
            <img/>
            <img/>
            <img/>
          </div>
        </div>
      </div>
      <div className='pet-card-buttons'>
        <button className='button add'>ADDED</button>
        <button className='button remove'>Remove</button>
      </div>
    </div>
  )
}

function PetCard({ name, image_url }) {
  return (
    <div className='pet-card'>
      <div className='image-container'>
        <Image
          centered circular className='pet-avatar'
          src={image_url}/>
      </div>
      <div className='pet-info-icons'>
        <p className='pet-name'>{name}</p>
        <p className='pet-breed'>Mixed Breed</p>
        <div>
          <img/>
          <img/>
          <img/>
          <img/>
        </div>
      </div>
    </div>
  )
}

export { PetCardButtons, PetCard }
