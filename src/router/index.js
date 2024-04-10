import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksView from '../views/TasksView.vue'
import DictionaryView from '../views/DictionaryView.vue'
import ProgressView from '../views/ProgressView.vue'
import TariffView from '../views/TariffView.vue'
import PaymentView from '../views/PaymentView.vue'
import CallbackView from '../views/CallbackView.vue'
import SigninView from '../views/SigninView.vue'
import LessonView from '../views/LessonView.vue'
import {LESSON} from "@/configuration/Routers";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView
  },
  {
    path: '/dictionary',
    name: 'dictionary',
    component: DictionaryView
  },
  {
    path: '/progress',
    name: 'progress',
    component: ProgressView
  },
  {
    path: '/tariff',
    name: 'tariff',
    component: TariffView
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallbackView
  },
  {
    path: '/auth',
    name: 'auth',
    component: SigninView
  },
  {
    path: LESSON,
    name: 'lesson',
    component: LessonView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
