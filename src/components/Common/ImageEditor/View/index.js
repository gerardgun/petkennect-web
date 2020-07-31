import React  from 'react'
import { Header, Image } from 'semantic-ui-react'
import ReactPlayer from 'react-player'

function View({ item }) {
  return (
    <>
      <Header as='h2'>
        <Header.Content>
          View {item.filetype === 'video' ? 'Video' : 'Photo'}
          <Header.Subheader>{item.filename}</Header.Subheader>
        </Header.Content>
      </Header>
      {
        item.filetype === 'video' ? (
          <div className='player-wrapper mb16'>
            <ReactPlayer
              className='react-player'
              controls
              height='100%'
              url={item.filepath}
              width='100%'/>
          </div>
        ) : (
          <Image
            className='mb16'
            rounded
            src={item.filepath}/>
        )
      }
    </>
  )
}

export default View
