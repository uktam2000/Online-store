
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:'home', loadChildren: ()=> import('./components/base/base.module').then(m=>m.BaseModule)}
 // {path:'', component:LoginComponent},
//  {path:'home', component: BaseComponent},
 //{path:'**', component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
