import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children:[
    {path:'', component:EmployeeListComponent},
    {path:'add-employee', component:EmployeeAddComponent}
  ] },
  
  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PublicRoutingModule { }
