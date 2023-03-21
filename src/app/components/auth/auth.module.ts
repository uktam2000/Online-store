import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AuthComponent } from './auth.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './auth.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { LoginService } from 'src/app/services/login.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/services/loader.service';



@NgModule({
  declarations: [
    AuthComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  providers:[
    AuthService, LoginService,LoaderService
  ]
})
export class AuthModule { }