import React, { useState, useEffect }  from 'react'
import { reduxForm } from 'redux-form'
import { useHistory } from 'react-router-dom'
import ReportTemplate from '@containers/report-card-setting'

const ReportSheetSetting = () => {
  const history = useHistory()
  console.log(history)
  const [ themeColor, setThemeColor ] = useState('#00AA9F18')
  const [ textColor, setTextColor ] = useState('#00b5ad')
  useEffect(()=>{
    if(history.location.state) {
      console.log('conditioned run')
      const data = history.location.state
      setThemeColor(data.themeColor)
      setTextColor(data.textColor)
    }
  },[ history.location ])

  return (

    <ReportTemplate
      imageSlider={false} textColor={textColor} themeColor={themeColor}/>

  )
}

export default  reduxForm({
  form              : 'report-sheet-form',
  destroyOnUnmount  : false,
  enableReinitialize: true
})(ReportSheetSetting)

