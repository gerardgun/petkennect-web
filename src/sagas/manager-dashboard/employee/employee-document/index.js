import { call, put, takeEvery } from 'redux-saga/effects'

import employeeDocumentDuck from '@reducers/manager-dashboard/employee/employee-document'

const { types } = employeeDocumentDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, file_name: 'Christie_I9.pdf', document_type: 'I-9 Form', description: ' ', category: 'Tax Forms', date_added: '06/16/2021' },
          { id: 2, file_name: 'Christie_w4.pdf', document_type: 'W-4 Form', description: ' ', category: 'Tax Forms', date_added: '06/16/2021' },
          { id: 3, file_name: 'Christie_Handbook.pdf', document_type: 'Other Document', description: 'Signed Handbook', category: 'New Hire Paperwork', date_added: '06/16/2021' },
          { id: 4, file_name: 'Christie_Performance.pdf', document_type: 'Other Document', description: 'Performance march', category: 'Performance Document', date_added: '06/16/2021' },
          { id: 5, file_name: 'Christie_LeashPolicy.pdf', document_type: 'Other Document', description: 'Signed Leash Memo', category: 'Acknowledgements', date_added: '06/16/2021' },
          { id: 6, file_name: 'Christie_BlankCheque.pdf', document_type: 'Direct Deposit', description: 'Cheque Image', category: 'Performance Document', date_added: '06/16/2021' }
        ]
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
