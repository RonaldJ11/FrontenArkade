import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import { AdminManagerRoutingModule } from './admin-manager-routing.module';
import { AdminManagerComponent } from './admin-manager.component';
import { SimulatorModule } from "../simulator/simulator.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminManagerComponent,
  ],
  imports: [
    CommonModule,
    AdminManagerRoutingModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    SimulatorModule,
    FormsModule
  ]
})
export class AdminManagerModule { }
