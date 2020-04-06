import React from 'react';
import {Header, Image, Tab } from 'semantic-ui-react';

const src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfcflOfqjDhj_f-eyIdZ_9Okn9XwcBT69lfDJa__Wj0A5sTXr0&usqp=CAU';

const MediaSection = props => {
  return (
    <Tab.Pane className='form-primary-segment-tab'>
      <Header as='h3'>Photo Gallery</Header>
      <Image.Group size='small'>
        <Image src={src} />
        <Image src={src} />
        <Image src={src} />
        <Image src={src} />
      </Image.Group>
    </Tab.Pane>
  )
};

export default MediaSection;