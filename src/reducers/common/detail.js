import produce from 'immer'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default {
  initialState: (duck, previousState = {}) => ({
    item: {},
    mode: null,
    ...previousState
  }),
  consts: {
    statuses: [ 'SET_ITEM', 'RESET_ITEM' ],
    modes   : [
      'CREATE', 'READ', 'UPDATE', 'DELETE', // Basic CRUD modes
      'DISABLE', 'FORCE_PASSWORD' // Other modes
    ]
  },
  types  : [ 'CREATE', 'EDIT', 'RESET_ITEM', 'SET_ITEM' ],
  reducer: (state, action, { types, modes, statuses, initialState }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.SET_ITEM:
          draft.item = typeof action.item === 'undefined' || action.item === null ? initialState.item : action.item

          if(action.mode in modes) draft.mode = action.mode
          else throw new Error(`${String(action.mode)} isn't a valid mode.`)

          draft.status = statuses.SET_ITEM

          return
        case types.RESET_ITEM:
          for (let key in initialState) draft[key] = initialState[key]

          draft.status = statuses.RESET_ITEM

          return
        default:
          return
      }
    }),
  creators: ({
    types: {
      // Para redux-sagas
      CREATE,
      DELETE, DELETE_FULFILLED, DELETE_FAILURE,
      EDIT,
      GET,
      PATCH, PATCH_FULFILLED, PATCH_FAILURE,
      POST, POST_FULFILLED, POST_FAILURE,
      PUT, PUT_FULFILLED, PUT_FAILURE,
      // Propios del reducer
      RESET,
      RESET_ITEM,
      SET,
      SET_ITEM
    },
    modes: { READ }
  }) => ({
    // Sagas creators
    create  : () => ({ type: CREATE }),
    'delete': (...ids) => ({
      type             : DELETE,
      ids,
      [WAIT_FOR_ACTION]: DELETE_FULFILLED,
      [ERROR_ACTION]   : DELETE_FAILURE
    }),
    edit : id => ({ type: EDIT, id }),
    get  : id => ({ type: GET, id }),
    patch: payload => ({
      type             : PATCH,
      payload,
      [WAIT_FOR_ACTION]: PATCH_FULFILLED,
      [ERROR_ACTION]   : PATCH_FAILURE
    }),
    post: payload => ({
      type             : POST,
      payload,
      [WAIT_FOR_ACTION]: POST_FULFILLED,
      [ERROR_ACTION]   : POST_FAILURE
    }),
    put: payload => ({
      type             : PUT,
      payload,
      [WAIT_FOR_ACTION]: PUT_FULFILLED,
      [ERROR_ACTION]   : PUT_FAILURE
    }),
    // Reducer creators
    set      : payload => ({ type: SET, payload }),
    reset    : () => ({ type: RESET }),
    resetItem: () => ({ type: RESET_ITEM }),
    setItem  : (item, mode = READ) => ({ type: SET_ITEM, item, mode })
  }),
  selectors: ({ store }) => ({
    detail: state => state[store]
  })
}
