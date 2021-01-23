import React,{ useState } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import moment from 'moment'

const DateSummary = ({ selectedDates, allSelectedWeek, untilNoOfOccurrences, startDate, endDate, frequency }) => {
  const [ active, setActive ] = useState(true)

  const resultString  = active ? selectedDates.slice(0,60) :  selectedDates

  const _handleClick = () =>{
    setActive(!active)
  }

  return (
    <>
      <Segment>
        <Header as='h3'>Reservation Date</Header>
        <p><b>Starting From:</b> {moment(startDate).format('MM/DD/YYYY')} </p>
        {untilNoOfOccurrences
          ? <p><b>Number of Occurence:</b> {untilNoOfOccurrences}</p>
          : <p><b>Ending Date:</b> { moment(endDate).format('MM/DD/YYYY')} </p>
        }
        <p><b>Frequency:</b> {
          frequency === 'every_other_week' ? 'Every Other Week' : ''
        }
        {
          frequency === 'every_week' ? 'Every Week' : ''
        }{
          frequency === 'every_custom_week' ? 'Every Custom Week' : ''
        }{
          frequency === 'monthly' ?  'Monthly'  :  ''
        }
        </p>
        <p><b>Days:</b> { allSelectedWeek.join(', ') }</p>
        <p><b>Selected Dates: </b>

          {resultString}
          {selectedDates.length > 58 && <a onClick={_handleClick} style={{ cursor: 'pointer' }}>
            {active ? ' more...' : ' less'}
          </a>}
        </p>
      </Segment>

    </>
  )
}

export default DateSummary
