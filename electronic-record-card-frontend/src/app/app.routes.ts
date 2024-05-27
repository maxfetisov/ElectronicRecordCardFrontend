import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/statement/statement.component').then(module => module.StatementComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then(module => module.LoginComponent)
  },
  {
    path: 'institutes',
    loadComponent: () => import('../app/institute/institute.component').then(module => module.InstituteComponent)
  },
  {
    path: 'groups',
    loadComponent: () => import('../app/group/group.component').then(module => module.GroupComponent)
  },
  {
    path: 'subjects',
    loadComponent: () => import('../app/subject/subject.component').then(module => module.SubjectComponent)
  },
  {
    path: 'marks',
    loadComponent: () => import('../app/mark/mark.component').then(module => module.MarkComponent)
  },
  {
    path: 'control-types',
    loadComponent: () => import('../app/control-type/control-type.component').then(module => module.ControlTypeComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('../app/user/user.component').then(module => module.UserComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('../app/profile/profile.component').then(module => module.ProfileComponent)
  },
  {
    path: 'user-subject-control-types',
    loadComponent: () => import('../app/user-subject-control-types/user-subject-control-types.component')
      .then(module => module.UserSubjectControlTypesComponent)
  }
];
