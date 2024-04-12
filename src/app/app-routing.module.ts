import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'Home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'add-users',
    loadChildren: () => import('./add-users/add-users.module').then( m => m.AddUsersPageModule)
  },
  {
    path: 'edit-userd',
    loadChildren: () => import('./edit-userd/edit-userd.module').then( m => m.EditUserdPageModule)
  },
  {
    path: 'job-list',
    loadChildren: () => import('./job-list/job-list.module').then( m => m.JobListPageModule)
  },
  {
    path: 'add-job',
    loadChildren: () => import('./add-job/add-job.module').then( m => m.AddJobPageModule)
  },
  {
    path: 'edit-job',
    loadChildren: () => import('./edit-job/edit-job.module').then( m => m.EditJobPageModule)
  },
  {
    path: 'user-desk',
    loadChildren: () => import('./user-desk/user-desk.module').then( m => m.UserDeskPageModule)
  },
  {
    path: 'process-status',
    loadChildren: () => import('./process-status/process-status.module').then( m => m.ProcessStatusPageModule)
  },
  {
    path: 'job-pdf',
    loadChildren: () => import('./job-pdf/job-pdf.module').then( m => m.JobPdfPageModule)
  },
  {
    path: 'parties',
    loadChildren: () => import('./parties/parties.module').then( m => m.PartiesPageModule)
  },
  {
    path: 'add-parties',
    loadChildren: () => import('./add-parties/add-parties.module').then( m => m.AddPartiesPageModule)
  },
  {
    path: 'edit-parties',
    loadChildren: () => import('./edit-parties/edit-parties.module').then( m => m.EditPartiesPageModule)
  },
  {
    path: 'filer-page',
    loadChildren: () => import('./filer-page/filer-page.module').then( m => m.FilerPagePageModule)
  },
  {
    path: 'job-done',
    loadChildren: () => import('./job-done/job-done.module').then( m => m.JobDonePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
