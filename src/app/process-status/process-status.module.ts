import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessStatusPageRoutingModule } from './process-status-routing.module';

import { ProcessStatusPage } from './process-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessStatusPageRoutingModule
  ],
  declarations: [ProcessStatusPage]
})
export class ProcessStatusPageModule {}
