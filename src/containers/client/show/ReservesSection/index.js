import React, { useEffect } from 'react'
import  './styles.scss'
import { connect } from 'react-redux'
import { Header , Divider } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import petReservationDuck from '@reducers/pet/reservation'

function ReservesSection(props) {
  const { petReservation : { filters = {} }  = {} } = props

  useEffect(()=> {
    props.setFilters({ service_type_what_ever_name: 'T'  })
    props.getPetReservations()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  const _handleFilterBtnClick = type => () => {
    props.setFilters({ service_type_what_ever_name: type })
    props.getPetReservations()
  }

  return (
    <div className='c-booking'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Reserves
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32'>
        <button
          className={`filter-button ml16 ${filters.service_type_what_ever_name === 'T' && 'selected'}`} color='blue '
          onClick={_handleFilterBtnClick('T')}>
          Training
        </button>
        <button
          className={`filter-button ml16 ${filters.service_type_what_ever_name === 'F' && 'selected'}`} color='blue '
          onClick={_handleFilterBtnClick('F')}>
          Fitness
        </button>
        <button
          className={`filter-button ml16 ${filters.service_type_what_ever_name === 'D' && 'selected'}`} color='blue '
          onClick={_handleFilterBtnClick('D')}>
          Day Camp
        </button>
        <button
          className={`filter-button ml16 ${filters.service_type_what_ever_name === 'B' && 'selected'}`} color='blue '
          onClick={_handleFilterBtnClick('B')}>
          Boarding
        </button>
        <button
          className={`filter-button ml16 ${filters.service_type_what_ever_name === 'G' && 'selected'}`} color='blue '
          onClick={_handleFilterBtnClick('G')}>
          Grooming
        </button>
      </div>
      <div className='mh40'>
        <Table
          duck={petReservationDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </div>
  )
}

ReservesSection.propTypes = {  }

ReservesSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petReservation: petReservationDuck.selectors.list(state)
    }), {
      getPetReservations: petReservationDuck.creators.get,
      setFilters        : petReservationDuck.creators.setFilters

    })
)(ReservesSection)

