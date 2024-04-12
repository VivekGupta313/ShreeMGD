import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserdPage } from './edit-userd.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserdPageRoutingModule {}
