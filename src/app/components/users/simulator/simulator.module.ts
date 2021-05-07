import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    SimulatorComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports:[
    SimulatorComponent
  ]
})
export class SimulatorModule { }
