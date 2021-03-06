import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button, span } from 'semantic-ui-react'
import './styles.scss'

const QuickLinks = ()=>{
  const history = useHistory()

  const _handleAnimalSettingsBtnClick = () => {
    history.replace('/setup/animal-setting')
  }

  const _handleVaccinationBtnClick = () => {
    history.replace('/setup/animal-setting/vaccination')
  }

  const _handleBehaviorTagsBtnClick = () => {
    history.replace('/setup/animal-setting/behavior-tag')
  }

  const _handleFeedingBtnClick = () => {
    history.replace('/setup/animal-setting/feeding')
  }

  const _handleBreedManagerBtnClick = () => {
    history.replace('/setup/animal-setting/breed-manager')
  }

  return (
    <>
      <Grid>
        <Grid.Column className='quick-link pr0'>
          <span className='quick-link-font' color='teal'><b>Quick Links:</b> &nbsp;</span>
          <Button
            className='mh12 link-tab' color='teal'
            content='Vaccination' name='vaccination' onClick={_handleVaccinationBtnClick}/>
          <Button
            className='mr12 link-tab' color='teal'
            content='Behavior Tags' name='behaviorTags' onClick={_handleBehaviorTagsBtnClick}/>
          <Button
            className='mr12 link-tab' color='teal'
            content='Animal Settings' name='animalSettings' onClick={_handleAnimalSettingsBtnClick}/>
          <Button
            className='mr12 link-tab' color='teal'
            content='Feeding' name='feeding' onClick={_handleFeedingBtnClick}/>
          <Button
            className='link-tab'
            color='teal'
            content='Breed Manager' name='breedManager' onClick={_handleBreedManagerBtnClick}/>
        </Grid.Column>
      </Grid>
    </>

  )
}

export default QuickLinks
