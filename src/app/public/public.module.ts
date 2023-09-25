import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PublicComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    IonicModule.forRoot()
  ]
})
export class PublicModule { }
