import React, { useState } from 'react'
import { Image, Icon } from 'semantic-ui-react'
import './styles.scss'

function PetCardSelect({ name, image_url, state, setState }) {
  const [ statusButton, setStatusButton ] = useState(false)
  function Filtername(name_f, state_f) {
    const filter = state_f.filter((item) => item !== name_f)

    return filter
  }

  return (
    <div className='pet-card-button' key={name}>
      <div className='pet-info-container'>
        <div className='image-container'>
          <Image
            centered circular className='pet-avatar'
            src={image_url}/>
        </div>
        <div className='pet-info-icons'>
          <p className='pet-name'>{name}</p>
          <p className='pet-breed'>Mixed Breed</p>
          <div className='icons-container'>
            <Icon className='pet-card-icon' name='medkit'/>
            <Icon className='pet-card-icon' color='blue' name='mars'/>
            <i aria-hidden='true' className='icon pet-card-icon'>
              <svg
                fill='currentColor'
                height='1em'
                stroke='currentColor'
                strokeWidth='0'
                viewBox='0 0 24 24'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M4.929,19.081c1.895,1.895,4.405,2.938,7.071,2.938s5.177-1.043,7.071-2.938c3.899-3.899,3.899-10.243,0-14.143 C17.177,3.044,14.665,2,12,2S6.823,3.044,4.929,4.938C1.03,8.837,1.03,15.182,4.929,19.081z M17.657,17.667 c-1.069,1.069-2.385,1.791-3.813,2.129c-0.009-1.602,0.586-3.146,1.691-4.251c1.163-1.163,2.732-1.828,4.277-1.851 C19.501,15.15,18.786,16.538,17.657,17.667z M19.982,11.702c-2.124-0.021-4.284,0.853-5.861,2.429 c-1.532,1.532-2.327,3.68-2.263,5.881c-2.079-0.036-4.033-0.862-5.516-2.345c-1.522-1.523-2.296-3.512-2.332-5.512 c0.077,0.002,0.154,0.014,0.231,0.014c2.115,0,4.16-0.804,5.637-2.28c1.58-1.58,2.457-3.739,2.43-5.873 c2.015,0.076,3.906,0.895,5.349,2.337C19.139,7.834,19.907,9.757,19.982,11.702z M6.343,6.353c1.108-1.108,2.482-1.849,3.973-2.169 c-0.018,1.555-0.685,3.124-1.851,4.291c-1.104,1.103-2.642,1.696-4.238,1.691C4.555,8.769,5.255,7.44,6.343,6.353z'></path>
              </svg>
            </i>
            <Icon className='pet-card-icon' name='map marker alternate'/>
          </div>
        </div>
      </div>
      <div className='pet-card-buttons'>
        {statusButton ? (
          <>
            <button className='button add'>ADDED</button>
            <button
              className='button remove'
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                setStatusButton(false)
                setState(Filtername(name, state))
              }}>
              Remove
            </button>
          </>
        ) : (
          <button
            className='ui green button'
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              setStatusButton(true)
              setState([ ...state, name ])
            }}>
            SELECT
          </button>
        )}
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
        <div className='icons-container'>
          <Icon className='pet-card-icon' name='medkit'/>
          <Icon className='pet-card-icon' color='blue' name='mars'/>
          <i aria-hidden='true' className='pet-card-icon'>
            <svg
              fill='currentColor'
              height='1em'
              stroke='currentColor'
              strokeWidth='0'
              viewBox='0 0 24 24'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M4.929,19.081c1.895,1.895,4.405,2.938,7.071,2.938s5.177-1.043,7.071-2.938c3.899-3.899,3.899-10.243,0-14.143 C17.177,3.044,14.665,2,12,2S6.823,3.044,4.929,4.938C1.03,8.837,1.03,15.182,4.929,19.081z M17.657,17.667 c-1.069,1.069-2.385,1.791-3.813,2.129c-0.009-1.602,0.586-3.146,1.691-4.251c1.163-1.163,2.732-1.828,4.277-1.851 C19.501,15.15,18.786,16.538,17.657,17.667z M19.982,11.702c-2.124-0.021-4.284,0.853-5.861,2.429 c-1.532,1.532-2.327,3.68-2.263,5.881c-2.079-0.036-4.033-0.862-5.516-2.345c-1.522-1.523-2.296-3.512-2.332-5.512 c0.077,0.002,0.154,0.014,0.231,0.014c2.115,0,4.16-0.804,5.637-2.28c1.58-1.58,2.457-3.739,2.43-5.873 c2.015,0.076,3.906,0.895,5.349,2.337C19.139,7.834,19.907,9.757,19.982,11.702z M6.343,6.353c1.108-1.108,2.482-1.849,3.973-2.169 c-0.018,1.555-0.685,3.124-1.851,4.291c-1.104,1.103-2.642,1.696-4.238,1.691C4.555,8.769,5.255,7.44,6.343,6.353z'></path>
            </svg>
          </i>
          <Icon className='pet-card-icon' name='map marker alternate'/>
        </div>
        <p className='service-tag'>Boarding Service Tag </p>
      </div>
    </div>
  )
}

export { PetCardSelect, PetCard }
