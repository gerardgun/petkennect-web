/* eslint-disable react/jsx-handler-names */
import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {  Modal ,Grid, Header, Button } from 'semantic-ui-react'
import Table from '@components/Table'
import petVaccinationListConfig from '@lib/constants/list-configs/pet/vaccination-dashboard'
import petVaccinationDuck from '@reducers/dashboard/vaccination'

const VaccinationUpdateForm = ()=>{
  const history = useHistory()
  const dispatch = useDispatch()
  const [ modalOpen,setModalOpen ] = useState(false)
  const [ petName, setPetName ] = useState('')
  const [ tableData, setTableData ] = useState([])
  const [ missingValues, setMissingValues ] = useState([])

  useEffect(()=>{
    if(history.location.state != undefined)
      if(history.location.state.screen === 'vaccination') {
        setModalOpen(true)
        const data = history.location.state
        setPetName(data.info.pet.name)
      }
      else
        setModalOpen(false)

    else
      setModalOpen(false)
  },[ history.location ])
  useEffect(() => {
    dispatch(
      petVaccinationDuck.creators.get()
    )
  }, [])

  const _handleClose = () => {
    history.push('/dashboard')
  }

  // const FetchingList = ()=>{
  //   dispatch(petVaccinationDuck.creators.get())
  // }

  const _handleFunciton = (changed,data)=>{
    let tempData = { ...data }
    let preExistData = missingValues && missingValues.find(item=>item.id == data.id)
    if(!changed.value && changed.required) {
      if(missingValues.length == 0)
        setMissingValues([ { id: data.id, missingField: [ changed.name ] } ])
      else

      if(preExistData == undefined)
        setMissingValues([ ...missingValues,{ id: data.id,missingField: [ changed.name ] } ])

      // else {
      //   let otherData = missingValues.filter(item=>item.id  != preExistData.id)
      //   if(!preExistData.missingField.includes(changed.name)) {
      //     let updatedField = { ...preExistData }
      //     updatedField.missingField = [ ...preExistData.missingField, changed.name ]
      //     console.log(updatedField)
      //   }
      // }   // code for if two or more fields are required
    }

    else if(changed.value) {
      tempData[changed.name] = changed.value

      // removing  code from missingValues if got data
      if(preExistData && changed.required) {
        let  remainingData = missingValues.filter(item=>item.id != data.id)
        setMissingValues(remainingData)
      }

      if(tableData.length == 0) {     // first time run
        setTableData([ tempData ])
      }
      else {
        let preExistField =  tableData && tableData.find((item)=>item.id == data.id)

        if(preExistField  == undefined)                       // pushing changed values that dont pre exist
        {setTableData([ ...tableData,tempData ])}

        else {
          let unChangedFields = tableData.filter(item=>item.id != preExistField.id)    // extracting unchanged pre exist fields

          let updatedField = { ...preExistField  }
          updatedField[changed.name] = changed.value             // updating only value that changed in preexist array

          setTableData([ ...unChangedFields,updatedField ])      // pushing updated and unchanged value in array
        }
      }
    }
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={modalOpen}>
      <div className='vaccination-header-div'>

        {/* show full name of pet  */}
        <Header
          as='h3' className='mb0' content={`Vaccinations for ${petName} `}/>
        <Header
          as='h4' className='mb0' color='blue'
          content='View Client File'/>
        {/* <Icon
          className='close-icon-style' name='times circle outline' onClick={_handleClose}
          size='large'/> */}
      </div>

      <Modal.Content>

        <Grid>
          <Grid.Column  className='pt0'computer={16} style={{ marginBottom: '-30px' }}>
            <Table
              config={petVaccinationListConfig}
              duck={petVaccinationDuck}
              onRowTextFieldChange={_handleFunciton}/>

          </Grid.Column>
          <Grid.Column className='pt0' computer={16} textAlign='right'>
            <Button
              content='Cancel' onClick={_handleClose}/>
            <Button
              color='teal' content='Email Reminder'
              onClick={_handleClose}/>
            <Button color='teal' content='Save Changes' onClick={_handleClose}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>

  )
}

export default VaccinationUpdateForm
