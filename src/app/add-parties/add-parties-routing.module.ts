import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPartiesPage } from './add-parties.page';

const routes: Routes = [
  {
    path: '',
    component: AddPartiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPartiesPageRoutingModule {}
