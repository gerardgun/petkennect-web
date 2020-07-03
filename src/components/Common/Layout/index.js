import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import Sidebar from '@components/Sidebar'

const Layout = ({ children }) => (
  <Container fluid>
    <Grid>
      <Grid.Column style={{ paddingBottom: 0, paddingRight: 0 }} width='three'>
        <Sidebar/>
      </Grid.Column>
      <Grid.Column style={{ paddingBottom: 0, paddingLeft: 0 }} width='thirteen'>

        <div className='app-content'>
          {/* Content */}
          {children}
        </div>

      </Grid.Column>
    </Grid>
  </Container>
)

export default Layout
