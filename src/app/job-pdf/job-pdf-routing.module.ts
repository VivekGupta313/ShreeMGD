import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPdfPage } from './job-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: JobPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPdfPageRoutingModule {}
