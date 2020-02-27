import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import Sidebar from '@components/Sidebar'
import AppBar from '@components/AppBar'

const Layout = ({ children }) => (
  <Container fluid>
    <Grid>
      <Grid.Column width='three'>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width='thirteen'>
        <AppBar />
        
        {/* Content */}
        {children}

      </Grid.Column>
    </Grid>
  </Container>
)

export default Layout
