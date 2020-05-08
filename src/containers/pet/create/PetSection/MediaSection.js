import React, { useEffect } from 'react'
import { Header, Image, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import petImageDuck from '@reducers/pet/image'
import { useParams } from 'react-router-dom'

const MediaSection = (props) => {
  const {
    petImage
  } = props
  const { id : pet_id } = useParams()
  useEffect(() => {
    props.get({ pet_id })
  }, [])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={petImage.status === 'GETTING'}>
      <Header as='h3'>Photo Gallery</Header>
      <Image.Group size='small'>
        {petImage.items.map(_petImage => (
          <Image key={_petImage}src={_petImage.filepath}/>
        ))}
      </Image.Group>
    </Tab.Pane>
  )
}

export default compose(
  connect(
    (state) => ({
      petImage: petImageDuck.selectors.list(state)
    }),
    {
      get: petImageDuck.creators.get
    }
  )
)(MediaSection)
