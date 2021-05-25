import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import {  FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { Grid, Icon, Card, Button } from 'semantic-ui-react'
import dashboardTaskDuck from '@reducers/dashboard/tasklist'
import { useChangeStatusEffect } from '@hooks/Shared'
import dashboardTaskDetailDuck from '@reducers/dashboard/tasklist/detail'
import TasklistModal from './tasklist-modal'
import CreateModal from './task-list-create-modal'
import TaskLabelGenrator from './task-field-array'

import '../../dashboard.scss'

const TaskList = (props) => {
  const {
    completedTasks,
    taskDetail,
    task
  } = props

  useChangeStatusEffect(taskDetail.status)

  const  _handleAllTasks = () => {
    props.setItem(null, 'READ')
  }

  return (
    <>
      <Card fluid  style={{ height: '400px' }}>
        <Grid  className='ph8 mb8'>
          <Grid.Column className='pb4 pt24 link-color' width={16}>
            <div className='flex justify-between'>
              <div>
                <Icon color='blue' name='clipboard outline'></Icon>
                <span style={{ fontSize: '12px' }}><b>Tasklist</b></span>
              </div>
              <Link className='text-font' onClick={_handleAllTasks}>All Tasks</Link>
              <Button
                className='button-font' content='Add Task'
                icon='add'
                onClick={()=>{props.setItem(null,'CREATE')}}
                style={{ color: 'white', backgroundColor: '#306EFF' }}/>
            </div>
          </Grid.Column>
        </Grid>
        <Grid className='ml0 mr0 mb8 mt0' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '2px' }}></Grid>
        <FieldArray
          completedTasks={completedTasks} component={TaskLabelGenrator}
          name='taskLabel'
          taskListData={task && task.items ? task.items : []}/>
      </Card>
      <TasklistModal/>
      <CreateModal/>
    </>
  )
}

export default  compose(
  connect(
    state => {
      const  taskDetail = dashboardTaskDetailDuck.selectors.detail(state)
      const task = dashboardTaskDuck.selectors.list(state)
      const completedTasks = formValueSelector('task-form-modal')(state,'taskLabel')

      return {
        completedTasks,
        taskDetail,
        task
      }
    },
    {
      setItem: dashboardTaskDetailDuck.creators.setItem
    }),
  reduxForm({
    form              : 'task-form-modal',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(TaskList)

