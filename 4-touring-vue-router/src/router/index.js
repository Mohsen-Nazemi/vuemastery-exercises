import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/event/DetailsView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import EventLayoutView from '../views/event/LayoutView.vue'
import NotFountView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'

import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventListView,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
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
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent}
    }
  },
  {
    path: '/about-us',
    name: 'about',
    component: AboutView,
    alias: '/about'
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFountView
  },
  {
    path: '/404/:resource',
    name: '404-resource',
    component: NotFountView,
    props: true
  },
  {
    path: '/network-error',
    name: 'network-error',
    component: NetworkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
