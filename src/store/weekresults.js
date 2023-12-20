export default {
  namespaced : true,
  state: {
    weekresults: [
      {day: 'Пн', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Вт', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Ср', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Чт', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Пт', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Сб', total:0, success: 0, errors: 0, state: 'lock'},
      {day: 'Вс', total:0, success: 0, errors: 0, state: 'lock'}
    ],
    index : 0
  },
  getters : {

    get (state) {
      return state.weekresults
    },

    getIndex (state) {
      return state.index
    }


  },
  mutations : {
    SETWEEKRESULTS(state, weekresults) {
      state.weekresults = weekresults
    },
    SETINDEX(state, index) {
      state.index = index
    },

  },
  actions : {
    set({ commit }, weekresults) {
      commit('SETWEEKRESULTS', weekresults)
    },
    setIndex({ commit }, index) {
      commit('SETINDEX', index)
    },
  }
}