import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilerPagePage } from './filer-page.page';

const routes: Routes = [
  {
    path: '',
    component: FilerPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilerPagePageRoutingModule {}
