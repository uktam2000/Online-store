import { ProductsService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  constructor(private productsService:ProductsService) { }

  sub2:Subscription | any;
  sub3:Subscription | any;
  sub4:Subscription | any;
  
  
  basket:any[] = [];
  sub1:Subscription | any;
  isLoaded = false;
  ngOnInit() {
    this.sub1 = this.productsService.getProductFromBasket()
    .subscribe((data)=>{
        this.basket = data;
        console.log('baskettt', data)
        this.isLoaded = true;
    })
  }
 
  minusItemFromBasket(item:IProducts){
    if(item.quantity === 1){
      this.sub2 = this.productsService.deleteProductFromBasket(item.id)
      .subscribe((data)=>{
        let idx = this.basket.findIndex((data)=> data.id === item.id);
        if(idx !==-1){
          this.basket.splice(idx, 1);
        }
      })
    }else{
      item.quantity -=1
      this.sub3 = this.productsService.updateProductBasket(item)
      .subscribe((data)=>{

      })
    }
    

   
  }

  plusItemFromBasket(item:IProducts){
    item.quantity +=1
    this.sub4 = this.productsService.updateProductBasket(item)
    .subscribe((data)=>{
      
    })
  }

  ngOnDestroy() {
    if(this.sub1){
       this.sub1.unsubscribe();
    }

    if(this.sub2){
      this.sub2.unsubscribe();
   }

   if(this.sub3){
    this.sub3.unsubscribe();
   }

   if(this.sub4){
  this.sub4.unsubscribe();
   }
   
  }

}
