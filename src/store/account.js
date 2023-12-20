export default {
  namespaced : true,
  state: {
    account: undefined,
  },
  getters : {
    isAuthenticated (state) {
      return (state.account) ? true : false
    },


    isNew (state) {
      console.log(state);
      return true
    },


    getUserName (state) {
      return (state.account) ? `${state.account.name1} ${state.account.name2} ${state.account.name3}`  : ''
    },

    getID (state) {
      return (state.account) ? state.account.id  : '0'
    }
    
  },
  mutations : {
    SETACCUNT(state, account) {
      state.account = account

    },

    SIGNOUT(state) {
      state.account = undefined
      
    },
  },
  actions : {
    setAccount({ commit }, account) {
      commit('SETACCUNT', account)
    },

    signout({ commit }) {
      commit('SIGNOUT')
    },

  }
}