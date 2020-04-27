import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Icon, Label, Menu, Tab } from 'semantic-ui-react'

import Layout from '@components/Layout'
import PetSection from './PetSection'

const PetCreate = () => {
  return (
    <Layout>
      <Tab
        className='detail-view-tab'
        menu={{ color: 'teal', tabular: true, attached: true }}
        panes={[
          {
            menuItem: (
              <Menu.Item key='pets'>
                <Icon name='paw'/>Pet Info<Label>2</Label>
              </Menu.Item>
            ),
            render: () => <PetSection/>
          },
          {
            menuItem: (
              <Menu.Item key='fitness'>
                Fitness
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
          },
          {
            menuItem: (
              <Menu.Item key='training'>
                Training<Label color='orange'>4</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab Content</Tab.Pane>
          },

          {
            menuItem: (
              <Menu.Item key='incidents'>
                Incidents<Label color='blue'>2</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab Content</Tab.Pane>
          },
          {
            menuItem: (
              <Menu.Item key='day-camp'>
                Day Camp<Label color='green'>1</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab Content</Tab.Pane>
          },
          {
            menuItem: (
              <Menu.Item key='day-camp'>
                Boarding<Label color='pink'>3</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab Content</Tab.Pane>
          },
          {
            menuItem: (
              <Menu.Item key='day-camp'>
                Grooming<Label color='purple'>3</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab Content</Tab.Pane>
          }
        ]}/>
    </Layout>
  )
}

export default compose(
  connect(
    () => ({}),
    {}
  )
)(PetCreate)
