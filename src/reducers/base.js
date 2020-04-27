import Duck from 'extensible-duck'
import produce from 'immer'

export default function createDuck({ namespace, store, initialState = {}, creators, selectors }) {
  return new Duck({
    namespace,
    store,
    consts: {
      statuses: [
        'CANCELED',
        'DELETED',
        'DELETING',
        'ERROR',
        'GETTING',
        'GOT',
        'PATCHING',
        'PATCHED',
        'POSTED',
        'POSTING',
        'PRISTINE',
        'PUT',
        'PUTTING'
      ]
    },
    types: [
      'DELETE',
      'DELETE_CANCEL',
      'DELETE_FAILURE',
      'DELETE_FULFILLED',
      'DELETE_PENDING',
      'GET',
      'GET_CANCEL',
      'GET_FAILURE',
      'GET_FULFILLED',
      'GET_PENDING',
      'PATCH',
      'PATCH_CANCEL',
      'PATCH_FAILURE',
      'PATCH_FULFILLED',
      'PATCH_PENDING',
      'POST',
      'POST_CANCEL',
      'POST_FAILURE',
      'POST_FULFILLED',
      'POST_PENDING',
      'PUT',
      'PUT_CANCEL',
      'PUT_FAILURE',
      'PUT_FULFILLED',
      'PUT_PENDING',
      'RESET',
      'SET'
    ],
    reducer: (state, action, { types, statuses }) =>
      produce(state, draft => {
        switch (action.type) {
          case types.DELETE_CANCEL:
          case types.GET_CANCEL:
          case types.PATCH_CANCEL:
          case types.POST_CANCEL:
          case types.PUT_CANCEL:
            draft.status = statuses.CANCELED

            return
          case types.DELETE_FAILURE:
          case types.GET_FAILURE:
          case types.POST_FAILURE:
          case types.PATCH_FAILURE:
          case types.PUT_FAILURE:
            draft.status = statuses.ERROR
            draft.error = action.error

            return
          case types.DELETE_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.DELETED

            return
          case types.DELETE_PENDING:
            draft.status = statuses.DELETING

            return
          case types.GET_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.GOT

            return
          case types.GET_PENDING:
            draft.status = statuses.GETTING

            return
          case types.PATCH_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.PATCHED

            return
          case types.PATCH_PENDING:
            draft.status = statuses.PATCHING

            return
          case types.POST_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.POSTED

            return
          case types.POST_PENDING:
            draft.status = statuses.POSTING

            return
          case types.PUT_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.PUT

            return
          case types.PUT_PENDING:
            draft.status = statuses.PUTTING

            return
          case types.RESET:
            draft = {
              ...initialState,
              status: statuses.PRISTINE,
              error : null
            }

            return
          case types.SET:
            for (let key in action.payload) draft[key] = action.payload[key]

            return
          default:
            return
        }
      }),
    selectors,
    creators,
    initialState: ({ statuses }) => ({
      ...initialState,
      status: statuses.PRISTINE,
      error : null
    })
  })
}
