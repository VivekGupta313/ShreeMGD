import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDonePage } from './job-done.page';

const routes: Routes = [
  {
    path: '',
    component: JobDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDonePageRoutingModule {}
