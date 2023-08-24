import Vue from 'vue'
import Vuex from 'vuex'
import EventService from './services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Mohsen Nazemi' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
      { id: 1, title: '...', organizer: true },
      { id: 2, title: '...', organizer: false },
      { id: 3, title: '...', organizer: true },
      { id: 4, title: '...', organizer: false }
    ]
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({commit}, event){
      return  EventService.postEvent(event).then(()=>{
        commit('ADD_EVENT', event)
      })
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
