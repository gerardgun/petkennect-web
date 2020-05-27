import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {  Tab, Button } from 'semantic-ui-react'

import _groupBy from 'lodash/groupBy'

import AddonGroupTable from './AddonGroupTable'
import AddonForm from './AddonForm'
import AddonGroupForm from './AddonGroupForm'

import serviceDetailDuck from '@reducers/service/detail'
import serviceAddonGroupDuck from '@reducers/service/addon/group'
import serviceAddonGroupDetailDuck from '@reducers/service/addon/group/detail'
import serviceAddonDetailDuck from '@reducers/service/addon/detail'

import { useChangeStatusEffect } from '@hooks/Shared'

export const defaultGroups = [ 'Bath & Brush', 'Hair Cut', 'Nails','Brush' ]

const FormInformation = props => {
  const {
    serviceDetail,
    serviceAddonDetail,
    serviceAddonGroup,
    match

  } = props

  useEffect(()=> {
    return ()=> props.resetItem()
  }, [])
  useChangeStatusEffect(()=> props.getService(match.params.id),serviceAddonDetail.status)

  useEffect(() => {
    const groups = _groupBy(serviceDetail.item.addons,'group_code')
    const _defaultGroups = defaultGroups.map(_defaultGroup => groups[_defaultGroup] ? ({
      id    : _defaultGroup,
      name  : _defaultGroup,
      addons: groups[_defaultGroup]
    }) : ({
      id    : _defaultGroup,
      name  : _defaultGroup,
      addons: []
    }))

    const customGroups = (Object.keys(groups))
      .filter(_group => !defaultGroups.includes(_group))
      .map(_customGroup => ({
        id    : _customGroup,
        name  : _customGroup,
        addons: groups[_customGroup]
      }))

    props.updateAddonGroups([ ..._defaultGroups,...customGroups ])
  }, [ serviceDetail.item.addons ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const loading = serviceDetail.status === 'GETTING'
  // const loading = serviceDetail.status === 'GETTING' && serviceAddonDetail.status === 'RESET_ITEM'

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={loading}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      {/* <pre>{JSON.stringify(addonGroups, null, 2)}</pre> */}
      {
        serviceAddonGroup.items.map(_group=>(<AddonGroupTable group={_group} key={_group.id}/>))
      }
      <Button
        basic
        color='teal'
        content='Create Addon Group' fluid
        icon='add'
        labelPosition='left'
        onClick={_handleAddBtnClick}
        size='massive'/>
      <AddonForm/>
      <AddonGroupForm/>
    </Tab.Pane>
  )
}

export default compose(
  withRouter,
  connect(
    ({  ...state }) => {
      return {
        serviceDetail     : serviceDetailDuck.selectors.detail(state),
        serviceAddonGroup : serviceAddonGroupDuck.selectors.list(state),
        serviceAddonDetail: serviceAddonDetailDuck.selectors.detail(state)
      }
    },
    {
      updateAddonGroups: serviceAddonGroupDuck.creators.update,
      getService       : serviceDetailDuck.creators.get,
      setItem          : serviceAddonGroupDetailDuck.creators.setItem,
      resetItem        : serviceAddonDetailDuck.creators.resetItem
    }
  )
)(FormInformation)

