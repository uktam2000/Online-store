import { User } from './shared/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { pipe, Observable, throwError, TimeoutError, EMPTY } from 'rxjs';
import { catchError, map, delay, timeout } from 'rxjs/operators';

@Injectable()
export class AuthService {
 
  constructor( private http:HttpClient) { }

  getUserByEmail(email:any){
     return this.http.get(`http://localhost:3000/users?email=${email}`)
     .pipe(
        map((data:any)=> data[0]? data[0] : undefined),
        timeout((4000)),
        delay(3000)
     )
  }

  postUser(user:User):Observable<any>{
    return this.http.post('http://localhost:3000/users', user)
    .pipe(
      map((user:any)=> user? user : undefined),
      timeout((4000)),
    )
 }
}
