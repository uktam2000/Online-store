import { EMPTY, pipe, Subscription, throwError } from 'rxjs';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../shared/models/message';
import { LoginService } from 'src/app/services/login.service';
import { catchError, finalize } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService:AuthService, 
    private router:Router, 
    private route:ActivatedRoute,
    private loginService:LoginService,
    private loaderService:LoaderService
    ) { }
  
  loginForm:FormGroup | any;
  
  user:any;
  message:Message| any;
  successMessage:Message | any;
  sub1:Subscription | any;

  

  public passwordState = false;
showMessage(message:Message){
  this.message = message;

  window.setTimeout(()=>{
    message.text = '';

    this.router.navigate([], {
      queryParams:{
        accessDenied:null
      },
      queryParamsHandling:'merge'
    })
  },3000)

}

showSuccessMessage(successMessage:Message){
  this.successMessage = successMessage;

  window.setTimeout(()=>{
    successMessage.text = '';
    this.router.navigate([], {
      queryParams:{
        nowCanLogin:null,
        email:null,
        password:null
      },
      queryParamsHandling:'merge'
    } );
  },3000)
}

  isUserExist = false;



  ngOnInit(){
    console.log('init');
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    console.log('loginform',this.loginForm)
    console.log(this.loaderService.loaderState)

  this.route.queryParams 
  .subscribe((params:Params)=>{
     if(params['nowCanLogin']){
       this.showSuccessMessage({
        text: 'Теперь вы можете зайти в систему'
       });
      //  let email = document.getElementById('email-input');
       this.loginForm.controls.email.value = params.email;
       this.loginForm.controls.password.value = params.password;
     }else if(params['accessDenied']){
        this.showMessage({
          text: 'Чтобы работать с системой вы должны залогиниться'
        })
     }
  });
  }

  showPassword(e:any){
    console.log(e);
   this.passwordState = e.checked;
   // this.passwordState = !this.passwordState;
  }

  onSubmit(){
    this.loaderService.loaderStateRx.next(true);
    this.user = this.loginForm.value;
    this.sub1 = this.authService.getUserByEmail(this.user.email)
    .pipe(
      catchError((err:any)=>{
        console.log('error',err)
        this.showMessage({
          text:'Cерверная ошибка! Пожалуйста подождите'
        })
        return EMPTY
      }),
      finalize(()=>{
          this.loaderService.loaderStateRx.next(false);
      })
    )
    .subscribe((user:any)=>{
      
       console.log('user--', user)
       if(user){
         if(this.user.password === user.password){
          // this.message.text = '';
          window.localStorage.setItem("user", JSON.stringify(user))
          this.loginService.login()
          this.router.navigate(['home'])
         }else{
          this.showMessage({
            text:'Пароль неверный'
          })
         }
       }else{
        this.showMessage({
          text:'Такого пользователя не существует'
        })
       // console.log('text', this.message.text)
        //  this.isUserExist = true;
       }
        
    }
      
    
    )
    
  }


  ngOnDestroy(){
     if(this.sub1){
      this.sub1.unsubscribe()
     }
  }

}
