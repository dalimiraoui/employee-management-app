import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAddComponent } from './employee-add/employee-add.component';



@NgModule({
  declarations: [
    PublicComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ]
})
export class PublicModule { }
