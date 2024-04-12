import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobPdfPageRoutingModule } from './job-pdf-routing.module';

import { JobPdfPage } from './job-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobPdfPageRoutingModule
  ],
  declarations: [JobPdfPage]
})
export class JobPdfPageModule {}
