import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'

import Table from '@components/Table'
import dashboardTaskListConfig from '@lib/constants/list-configs/dashboard/tasklist'
import dashboardTaskDuck from '@reducers/dashboard/tasklist'
import dashboardTaskDetailDuck from '@reducers/dashboard/tasklist/detail'

const TasklistModal = (props) => {
  const {
    taskDetail
  } = props

  useEffect(() => {
    props.getDashboardTasks()
  }, [])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(taskDetail.mode), [
    taskDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        <Header as='h2' content='All Tasks'/>
        <Grid>
          <Grid.Column className='pb0' computer={16}>

            <Table
              config={dashboardTaskListConfig}
              duck={dashboardTaskDuck}/>

          </Grid.Column>
          <Grid.Column className='pt0' computer={16} textAlign='right'>
            <Button content='Cancel' onClick={_handleClose}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const taskDetail = dashboardTaskDetailDuck.selectors.detail(state)

      return {
        taskDetail,
        task: dashboardTaskDuck.selectors.list(state)
      }
    },
    {
      getDashboardTasks: dashboardTaskDuck.creators.get,
      post             : dashboardTaskDetailDuck.creators.post,
      put              : dashboardTaskDetailDuck.creators.put,
      resetItem        : dashboardTaskDetailDuck.creators.resetItem
    }
  )
)(TasklistModal)
