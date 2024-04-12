import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserdPageRoutingModule } from './edit-userd-routing.module';

import { EditUserdPage } from './edit-userd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUserdPageRoutingModule
  ],
  declarations: [EditUserdPage]
})
export class EditUserdPageModule {}
