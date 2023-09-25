import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './public/error/error.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "redirect",
    pathMatch: "full"
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
    },
  {
    path: "**",
    redirectTo: "error"
  },
  {
    path: "error",
    component: ErrorComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
