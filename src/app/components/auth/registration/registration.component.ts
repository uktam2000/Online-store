import { LoaderService } from './../../../services/loader.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../shared/models/message';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(
    private authService:AuthService, 
    private route:Router,
    private loaderService:LoaderService
    ) { }
  
  
  passwordState = false
  regisForm:FormGroup | any;
  message:Message | any;
  user: User | any;
  sub1:Subscription | any;

  showMessage(message:Message){
    this.message = message;

    window.setTimeout(()=>{
      this.message = '';
    },2000 )
  }

  ngOnInit() {
     this.regisForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'gender': new FormControl('', Validators.required)
    })
  }

  onSubmit(){ 
    this.loaderService.loaderStateRx.next(true);
    this.user = this.regisForm.value;
    
    this.sub1 = this.authService.postUser(this.user)
    .pipe(
      catchError((err:any)=>{
        console.log('error',err)
        this.showMessage({
          text:'Cерверная ошибка! Пожалуйста попытайтесь попозже'
        })
        return EMPTY
      }),
      finalize(()=>{
        this.loaderService.loaderStateRx.next(false);
      })     
    )
    .subscribe((user)=>{
      console.log('user',user)
      this.route.navigate(['/login'],{
        queryParams:{
          nowCanLogin:true,
          email:this.user.email,
          password:this.user.password,

        }
      })
    })
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe()
    }
  }
}
