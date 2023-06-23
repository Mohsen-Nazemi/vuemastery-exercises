import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/event/DetailsView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import EventLayoutView from '../views/event/LayoutView.vue'

import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventListView,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/:id',
    name: 'event-layout',
    props: true,
    component: EventLayoutView,
    children: [ 
      {
        path: '',
        name: 'event-details',
        component: EventDetailsView
      },
      {
        path: 'register',
        name: 'event-register',
        component: EventRegisterView
      },
      {
        path: 'edit',
        name: 'event-edit',
        component: EventEditView
      },

    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
