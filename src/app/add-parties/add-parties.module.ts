import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPartiesPageRoutingModule } from './add-parties-routing.module';

import { AddPartiesPage } from './add-parties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPartiesPageRoutingModule
  ],
  declarations: [AddPartiesPage]
})
export class AddPartiesPageModule {}
