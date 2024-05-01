import { Routes } from '@angular/router';

export const routes: Routes = [
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
  }
];
