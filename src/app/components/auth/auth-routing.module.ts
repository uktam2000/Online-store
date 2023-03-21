import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes:Routes = [
  {path:'', component:AuthComponent, children:[
    // {path:'', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'registration', component:RegistrationComponent},
  ]}
    
    // {path:'**', component:NotFoundComponent} 
]; 


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule{}