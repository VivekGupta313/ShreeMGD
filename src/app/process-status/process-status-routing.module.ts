import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessStatusPage } from './process-status.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessStatusPageRoutingModule {}
