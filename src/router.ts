import { createRouter, createWebHistory } from 'vue-router';
import { mockUsers } from './stores/app.mocks';

export const enum RouteName {
  User = 'user',
  Task = 'task',
  TaskEdit = 'edit',
  TaskCreate = 'create'
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: `/${RouteName.User}/${mockUsers[0].id}`
    },
    {
      path: `/${RouteName.User}/:userId`,
      name: RouteName.User,
      component: () => import('./views/task-list-view/TaskListView.vue'),
    },
    {
      path: `/${RouteName.User}/:userId/${RouteName.Task}/:taskId`,
      name: RouteName.Task,
      component: () => import('./views/TaskView.vue'),
    },
    {
      path: `/${RouteName.User}/:userId/${RouteName.Task}/:taskId/${RouteName.TaskEdit}`,
      name: RouteName.TaskEdit,
      component: () => import('./views/TaskEditView.vue'),
    },
    {
      path: `/${RouteName.User}/:userId/${RouteName.Task}/${RouteName.TaskCreate}`,
      name: RouteName.TaskCreate,
      component: () => import('./views/TaskCreateView.vue'),
    }
  ]
})

export default router
