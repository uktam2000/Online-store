import { IProducts } from './../models/products';
import { ProductsService } from './../services/product.service';
import { Injectable } from '@angular/core';
import{catchError} from 'rxjs/operators';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<boolean> {

  constructor(private productsService:ProductsService, private router:Router){};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.productsService.getProduct(route.params?.['id']).pipe(
      catchError((err:any)=>{
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
