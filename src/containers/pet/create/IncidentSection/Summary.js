import React from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'


const  Message = loadable(() => import('@components/Message'))

function Summary({ warningIncidentTypes  }) {
  const isDanger = warningIncidentTypes.some(_type => _type.limit - _type.count <= 0)

  return Boolean(warningIncidentTypes.length) && (
    <Message
      content={
        <Grid padded style={{ marginLeft: -16 }}>
          <Grid.Column className='mb0 pb0' width='16'>
            <div className='message__title'>{isDanger ?  'The limit of allowed incidents has been reached.' : 'Some types of incidents are going over the limits.' } </div>
          </Grid.Column>
          <Grid.Column width='16'>
            <Grid>
              {warningIncidentTypes.map((_type, index) => (<Grid.Column key={index} width={4}>
                <div  className='message__subtitle'>{_type.name}</div>
                <div className={`message__description ${_type.limit - _type.count <= 0 && 'danger'}`} >
                  {_type.count} of {_type.limit}
                </div>
              </Grid.Column>))}

            </Grid>

          </Grid.Column>
        </Grid>

      } type={isDanger ? 'danger' : 'warning'}/>
  )
}

Summary.propTypes = {
  warningIncidentTypes: PropTypes.array.isRequired,
  type                : PropTypes.oneOf([ 'warning', 'danger' ])
}

Summary.defaultProps = {  }

export default Summary
