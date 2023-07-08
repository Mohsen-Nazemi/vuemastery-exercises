import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/event/DetailsView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import EventLayoutView from '../views/event/LayoutView.vue'
import NotFountView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import AboutView from '../views/AboutView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'

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
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event  = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404-resource',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'network-error' }
          }
        })
    },
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
      return { path: '/events/' + to.params.afterEvent }
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


router.beforeEach(() => {
  NProgress.start()
})


router.afterEach(() => {
  NProgress.done()
})

export default router
