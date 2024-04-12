import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilerPagePageRoutingModule } from './filer-page-routing.module';

import { FilerPagePage } from './filer-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilerPagePageRoutingModule
  ],
  declarations: [FilerPagePage]
})
export class FilerPagePageModule {}
