import React, { useEffect } from 'react'
import {  Field } from 'redux-form'
import { Grid, Label, Checkbox } from 'semantic-ui-react'
import FormField from '@components/Common/FormField'
import '../../dashboard.scss'

const TaskCreator = ({ fields, taskListData,completedTasks })=>{
  useEffect(()=>{
    if(taskListData && taskListData.length != 0 && fields.length === 0)
      taskListData.forEach(()=>{
        fields.push()
      })
  },[ taskListData ])

  return (
    <>

      {
        fields.map((item, index) => {
          return (
            <>
              { taskListData &&  taskListData.length != 0
                && <Grid
                  className={completedTasks.length != 0
                && completedTasks[index]
                && completedTasks[index].task ? 'ph8 mv0 completed-task' : 'ph8 mv0'}
                  key={index} style={{ display: 'flex' }}>
                  <Grid.Column className='pt4' width={1}>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      name={`${item}.task`}/>
                  </Grid.Column>
                  <Grid.Column className='icon-style pt0' width={14}>
                    <span className='text-font'><b>{taskListData[index] ? taskListData[index].task : ''}</b></span><br/>
                    <span className='text-font' style={{ marginRight: '4px' }}>{taskListData[index] ? taskListData[index].date : ''}
                      {
                        taskListData[index] && taskListData[index].priority === 'High' && (
                          <Label className='task-label-style ml4' style={{ color: 'white', backgroundColor: '#fc9e19' }}>High</Label>
                        )
                      }
                      {
                        taskListData[index] && taskListData[index].priority === 'Medium' && (
                          <Label className='task-label-style ml4' style={{ color: 'white', backgroundColor: '#306EFF' }}>Medium</Label>
                        )
                      }
                      {
                        taskListData[index] && taskListData[index].priority === 'Low' && (
                          <Label className='task-label-style ml4' style={{ color: 'white', backgroundColor: '#70c74e' }}>Low</Label>
                        )
                      }
                    </span>
                  </Grid.Column>
                </Grid>
              }
            </>
          )
        })
      }
    </>
  )
}
TaskCreator.defaultProps = {
  taskListData  : [],
  completedTasks: []
}
export default TaskCreator
