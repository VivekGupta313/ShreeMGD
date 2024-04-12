import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDonePageRoutingModule } from './job-done-routing.module';

import { JobDonePage } from './job-done.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDonePageRoutingModule
  ],
  declarations: [JobDonePage]
})
export class JobDonePageModule {}
