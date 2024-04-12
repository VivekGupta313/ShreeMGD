import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPartiesPageRoutingModule } from './edit-parties-routing.module';

import { EditPartiesPage } from './edit-parties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPartiesPageRoutingModule
  ],
  declarations: [EditPartiesPage]
})
export class EditPartiesPageModule {}
