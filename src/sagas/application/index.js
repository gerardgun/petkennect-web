import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import applicationDuck from '@reducers/application'

import { defaultImageUrl } from '@lib/constants'

const { types } = applicationDuck

function* getSearchResult(payload) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = {
      search   : payload.id.search,
      page_size: payload.id.page_size
    }
    let searchResult = []
    const petResult = yield call(Get, 'pets/', filters)
    const clientResult = yield call(Get, 'clients/', filters)

    let clientSearchResult = clientResult.results.map(item => ({
      title      : item.first_name + ' ' + item.last_name,
      description: 'Client',
      image      : item.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${item.thumbnail_path}` : defaultImageUrl,
      id         : item.id
    }))

    let petSearchResult = petResult.results.map(item => ({
      title      : item.name,
      description: 'Pet',
      image      : item.image_filepath ? item.image_filepath : defaultImageUrl,
      id         : item.id
    }))

    if(payload.id.type == 'clients')
      searchResult = clientSearchResult
    else if(payload.id.type == 'pets')
      searchResult = petSearchResult
    else
      searchResult = petSearchResult.concat(clientSearchResult)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        appbar_search_results: searchResult
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
  takeEvery(types.GET, getSearchResult)
]
