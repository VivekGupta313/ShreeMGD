import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPartiesPage } from './edit-parties.page';

const routes: Routes = [
  {
    path: '',
    component: EditPartiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPartiesPageRoutingModule {}
