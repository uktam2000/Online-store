import { delay, timeout } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { IProducts } from './../models/products';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ProductsService{

    url:string = 'http://localhost:3000/products'
    urlBasket:string = 'http://localhost:3000/basket'
    constructor(private http:HttpClient){}
    getProducts(){
       return this.http.get<IProducts[]>('http://localhost:3000/products')
       .pipe(
        delay(2000),
        timeout((3000))
       )
    }

    getProduct(id:number){
       return this.http.get<IProducts[]>(`${this.url}/${id}`)
       .pipe(
          delay(4000)
       )
    }

    postProduct(product:IProducts){
        return this.http.post<IProducts[]>(this.url, product)
        .pipe(
            timeout((3000))
           )
    }

    deleteProduct(id:number){
        return this.http.delete<any>(`${this.url}/${id}`)
        .pipe(
            timeout((3000))
           )
    }

    updateProduct(product:IProducts){
        return this.http.put<any>(`${this.url}/${product.id}`, product)
        .pipe(
            timeout((3000))
           )
    }

    postProductToBasket(product:IProducts){
        return this.http.post<IProducts[]>(this.urlBasket, product)
        .pipe(
            timeout((3000))
           )
    }

    getProductFromBasket(){
        return this.http.get<IProducts[]>(this.urlBasket)
        .pipe(
            timeout((3000))
           )
    }

    updateProductBasket(product:IProducts){
        return this.http.put<any>(`${this.urlBasket}/${product.id}`, product)
        .pipe(
            timeout((3000))
           )
    }

    deleteProductFromBasket(id:number){
        return this.http.delete<any>(`${this.urlBasket}/${id}`)
        .pipe(
            timeout((3000))
           )
    }
}