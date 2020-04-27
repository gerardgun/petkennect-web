import React from 'react'
import { Grid, Pagination as SemanticPagination } from 'semantic-ui-react'

const Pagination = ({ from, to, total, ...rest }) => (
  <Grid columns={16} textAlign='center'>
    <Grid.Row>
      <Grid.Column width={16}>
        <SemanticPagination size='mini' {...rest}/>
        <div style={{ paddingTop: '1rem', fontSize: '0.9rem' }}>
          <span>{from} to {to} of {total} records</span>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

Pagination.defaultProps = {
  from : 1,
  to   : 10,
  total: 100
}

export default Pagination
