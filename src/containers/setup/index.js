import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import _get from 'lodash/get'

import Layout from '@components/Common/Layout'
import items from './items'

const SetupIndex = () => {
  return (
    <Layout>
      <Segment className='segment-content' padded='very'>

        <Card.Group itemsPerRow={4}>

          {
            items.map((item, index) => (
              <Card key={index}>
                <Card.Content>
                  <Header as='h4' color='teal'>
                    <Icon name={item.icon}/>{item.name}
                  </Header>
                  <Menu fluid secondary vertical>
                    {
                      item.items.map((item, index) => (
                        <Menu.Item
                          as={Link} disabled={_get(item, 'disabled', false)} key={index}
                          to={item.to}>{item.name}</Menu.Item>
                      ))
                    }
                  </Menu>
                </Card.Content>
              </Card>
            ))
          }

        </Card.Group>

      </Segment>
    </Layout>
  )
}

export default SetupIndex
