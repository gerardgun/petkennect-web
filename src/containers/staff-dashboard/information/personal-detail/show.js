import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Card, Header, Icon } from 'semantic-ui-react'

import { HiPencil } from 'react-icons/hi'

import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'

import ShowDetail from './show-detail'

import '../styles.scss'

const PersonalDetailShow = ({ ...props })=>{
  // const { item: client } = personalInformationDetail

  const _handleEditBtnClick = () => {
    props.setItem(null, 'UPDATE')
  }

  return (
    <Card className='staff-information-styles' fluid>
      <div className='heading-style pv12 flex' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Header as='h4' className='mr4 mb0 ml16' style={{ opacity: '0.9' }}>
            Personal Details
        </Header>
        <Link onClick={_handleEditBtnClick}><Icon color='teal' size='large'><HiPencil/></Icon></Link>
      </div>
      <div>
        <ShowDetail/>
      </div>
    </Card>

  )
}

export default  compose(
  connect(
    state => ({
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }), {
      setItem: personalInformationDetailDuck.creators.setItem
    })
)(PersonalDetailShow)
