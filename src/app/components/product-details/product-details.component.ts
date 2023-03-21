import { Subscription } from 'rxjs';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  product:IProducts | any;
  productSubscription:Subscription | any;

  isLoaded = false;
  ngOnInit(): void {
    console.log('init');
     this.productSubscription = this.route.data
     .pipe(
      delay(2000)
     )
     .subscribe((data)=>{
         this.product = data['data'];
         this.isLoaded = true;
         'this.getPr(data.id)'
     })
  }

}
