import React from 'react'

const PetProfileProperty = ({ name, value }) => (
  <div className='flex align-center'>
    <div className='mr12'>
      <span style={{ color: '#888888' }}>{name}:</span>
    </div>
    <div style={{ flex: 1 }}>{value}</div>
  </div>
)

export default PetProfileProperty
