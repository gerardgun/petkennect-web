import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

const HeaderLink = ({ sideBarHidden })=>{
  return (
    <div>
      <Header
        as={Link} className='mt0 mb0 mr24' color='teal'
        content='My Profile'
        to={{ pathname: '/staff-dashboard', state: { isSideBarHidden: sideBarHidden } }}/>
      <Header
        as={Link} className='mt0 mb0' color='grey'
        content='Manager Dashboard'
        to={{ pathname: '/manager-dashboard/employee-directory', state: { isSideBarHidden: sideBarHidden } }}/>
    </div>
  )
}

HeaderLink.defaultProps = {
  sideBarHidden: true
}
export default HeaderLink

