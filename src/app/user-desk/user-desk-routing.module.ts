import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDeskPage } from './user-desk.page';

const routes: Routes = [
  {
    path: '',
    component: UserDeskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDeskPageRoutingModule {}
