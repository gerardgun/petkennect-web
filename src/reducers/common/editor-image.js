import produce from 'immer'

import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default {
  initialState: (duck, previousState = {}) => ({
    editorItem: {},
    editorStep: null,
    editorMode: null,
    ...previousState
  }),
  consts: {
    statuses: [
      'SET_EDITOR_ITEM', 'RESET_EDITOR_ITEM',
      //
      'EDITOR_POSTING', 'EDITOR_POSTED',
      'EDITOR_PUTTING', 'EDITOR_PUT'

    ],
    modes: [ 'EDITOR_CREATE','EDITOR_UPDATE' , 'EDITOR_READ' ],
    steps: [ 'VIEW', 'CAMERA', 'EDITOR', 'PICKER' ]

  },
  types: [
    'RESET_EDITOR_ITEM', 'SET_EDITOR_ITEM',
    // ///
    'EDITOR_POST',
    'EDITOR_POST_FAILURE',
    'EDITOR_POST_FULFILLED',
    'EDITOR_POST_PENDING',
    'EDITOR_PUT',
    'EDITOR_PUT_FAILURE',
    'EDITOR_PUT_FULFILLED',
    'EDITOR_PUT_PENDING'
  ],
  reducer: (state, action, { types, statuses, initialState }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.SET_EDITOR_ITEM:
          draft.editorItem = typeof action.editorItem === 'undefined' || action.editorItem === null ? initialState.editorItem : action.editorItem
          draft.editorMode = action.editorMode
          draft.editorStep = action.editorStep

          draft.status = statuses.SET_EDITOR_ITEM

          return
        case types.RESET_EDITOR_ITEM:
          for (let key in initialState) draft[key] = initialState[key]

          draft.status = statuses.RESET_EDITOR_ITEM

          return

        case types.EDITOR_POST_FULFILLED:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.EDITOR_POSTED

          return
        case types.EDITOR_POST_PENDING:
          draft.status = statuses.EDITOR_POSTING

          return
        case types.EDITOR_POST_FAILURE:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.ERROR
          draft.error = action.error

          return
        case types.EDITOR_PUT_FULFILLED:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.EDITOR_PUT

          return
        case types.EDITOR_PUT_PENDING:
          draft.status = statuses.EDITOR_PUTTING

          return
        case types.EDITOR_PUT_FAILURE:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.ERROR
          draft.error = action.error

          return
        default:
          return
      }
    }),
  creators: ({
    types: {
      // Para redux-sagas
      EDITOR_POST,
      EDITOR_POST_FAILURE,
      EDITOR_POST_FULFILLED,
      EDITOR_PUT,
      EDITOR_PUT_FAILURE,
      EDITOR_PUT_FULFILLED,
      // Propios del reducer
      RESET,
      RESET_EDITOR_ITEM,
      SET_EDITOR_ITEM
    },
    modes: { EDITOR_READ }
  }) => ({
    // Sagas creators
    editorPost: payload => ({
      type             : EDITOR_POST,
      payload,
      [WAIT_FOR_ACTION]: EDITOR_POST_FULFILLED,
      [ERROR_ACTION]   : EDITOR_POST_FAILURE
    }),
    editorPut: payload => ({
      type             : EDITOR_PUT,
      payload,
      [WAIT_FOR_ACTION]: EDITOR_PUT_FULFILLED,
      [ERROR_ACTION]   : EDITOR_PUT_FAILURE
    }),
    // Reducer creators
    reset          : () => ({ type: RESET }),
    resetEditorItem: () => ({ type: RESET_EDITOR_ITEM }),
    setEditorItem  : (editorItem, editorMode = EDITOR_READ, editorStep) => ({ type: SET_EDITOR_ITEM, editorItem, editorMode , editorStep })
  }),
  selectors: ({ store }) => ({
    detail: state => state[store]
  })
}
