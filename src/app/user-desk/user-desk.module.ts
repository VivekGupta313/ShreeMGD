import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDeskPageRoutingModule } from './user-desk-routing.module';

import { UserDeskPage } from './user-desk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDeskPageRoutingModule
  ],
  declarations: [UserDeskPage]
})
export class UserDeskPageModule {}
