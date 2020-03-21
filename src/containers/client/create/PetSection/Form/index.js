import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { destroy } from 'redux-form'
import { Icon, Label, Menu, Modal, Tab } from 'semantic-ui-react'

import Layout from '@components/Layout'
import PetSection, { formIds } from './PetSection'
// import IncidentSection from './IncidentSection'

import petDetailDuck from '@reducers/pet/detail'

const PetCreate = props => {
  const {
    petDetail,
    match,
    destroy,
    get,
    // getDocuments,
    // getInteractions,
    // getPets,
  } = props

  useEffect(() => {
    if(petDetail.status === 'SET_ITEM' && isUpdating) {
      // Verify if is modal
      if(true) {
        get(petDetail.item.id)
        // getDocuments()
        // getInteractions()
        // getPets()
      } else {
        get(match.params.pet)
      }
    }
  }, [ petDetail.status ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    props.resetItem()
    destroy(...formIds)
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])
  const isUpdating = Boolean(petDetail.item.id)

  return (
    <Modal
      className='form-modal side tab'
      open={isOpened}
      onClose={_handleClose}
      size='large'
    >
      <Modal.Content>
        <Tab
          className='detail-view-tab'
          menu={{ color: 'teal', tabular: true, attached: true }}
          panes={[
            {
              menuItem: { key: 'pet', icon: 'paw', content: 'Pet Info' },
              render: () => <PetSection />,
            },
            {
              menuItem: { key: 'incidents', content: 'Incidents' },
              // render: () => <IncidentSection />,
              render: () => <Tab.Pane>Tab Incident Content</Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='training'>
                  Training <Label>4</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='fitness'>
                  Fitness <Label>4</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane>Tab 4 Content</Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='daycamp'>
                  Day Camp <Label>4</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane>Tab 5 Content</Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='boarding'>
                  Boarding <Label>4</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane>Tab 6 Content</Tab.Pane>,
            },
            {
              menuItem: (
                <Menu.Item key='grooming'>
                  Grooming <Label>4</Label>
                </Menu.Item>
              ),
              render: () => <Tab.Pane>Tab 7 Content</Tab.Pane>,
            },
          ]} />
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state),
    }),
    {
      destroy,
      get            : petDetailDuck.creators.get,
      resetItem      : petDetailDuck.creators.resetItem,
      // getDocuments   : clientDocumentDuck.creators.get,
      // getInteractions: clientInteractionDuck.creators.get,
      // getPets        : clientPetDuck.creators.get,
    }
  ),
)(PetCreate)