import Vuex from 'vuex'

import { userStore } from './modules/user.store.js'
import { boardStore } from './modules/board-store.js'
import { reviewStore } from './modules/review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    boardStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
