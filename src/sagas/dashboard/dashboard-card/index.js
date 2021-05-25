import { call, put, takeEvery, select } from 'redux-saga/effects'

import dashboardCardDuck from '@reducers/dashboard-card'

const { selectors, types } = dashboardCardDuck
function* get() {
  try {
    const filters = yield select(selectors.filters)
    console.log(filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    let results =  [ { id      : 1, service : 'Boarding' , expected: '15' ,'in'    : '35', out     : '5',total   : '45',occ     : '30%', icon    : 'add',
      items   : [ { id: 1, service: 'Boarding + Day Camp' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 2, service: 'Boarding + Day Camp' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 3, service: 'Boarding + TLC' , expected: '4' ,'in': '3', out: '0',total: '7',occ: '13%' }
      ]  },
    { id      : 2, service : 'Day Service' , expected: '15' ,'in'    : '35', out     : '5',total   : '45',occ     : '42%', icon    : 'add',
      items   : [ { id: 1, service: 'Day Camp' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 2, service: ' Day Boarding' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 3, service: 'Dog Walking' , expected: '4' ,'in': '3', out: '0',total: '7',occ: '13%' }
      ] },
    { id      : 3, service : 'Training' , expected: '15' ,'in'    : '35', out     : '5',total   : '45',occ     : '30%' ,icon    : 'add',
      items   : [ { id: 1, service: 'Fitness' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 2, service: 'Jumping' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 3, service: 'Roung' , expected: '4' ,'in': '3', out: '0',total: '7',occ: '13%' }
      ] },
    { id      : 4, service : 'Grooming' , expected: '15' ,'in'    : '35', out     : '5',total   : '45',occ     : '56%' , icon    : 'add',
      items   : [ { id: 1, service: 'Haircut' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 2, service: 'Body Wash' , expected: '6' ,'in': '25', out: '5',total: '26',occ: '10%' },
        { id: 3, service: 'Nails' , expected: '4' ,'in': '3', out: '0',total: '7',occ: '13%' }
      ] },
    { id: 4, service: 'Total' , expected: '95' ,'in': '73', out: '31',total: '137',occ: '40%', buttonDisabled: true }
    ]
    let finalResult
    if(filters.search != 'all') {
      finalResult = results.filter((item)=>item.service === filters.search)
      finalResult[0].icon = 'minus'
    }

    else
    {finalResult = results.map((item)=>{
      if(item.items)
        delete item.items

      return item
    })}

    if(filters.search == 'all')
      yield put({ type: types.GET_PENDING })

    yield put({
      type: types.GET_FULFILLED,

      payload: {
        items: finalResult

      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get)
]
