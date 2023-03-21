import { catchError } from 'rxjs/operators';
import { ProductsService } from './../../services/product.service';
import { IProducts } from './../../models/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotFoundComponent } from '../not-found/not-found.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private productsService:ProductsService, 
    public dialog: MatDialog,
    private _snackBar:MatSnackBar
    ) { }

  products:IProducts | any;
  sub1:Subscription | any;
  sub2:Subscription | any;
  sub3:Subscription | any;
  sub4:Subscription | any;

  basket:IProducts | any;
  sub5:Subscription | any;

  isLoaded = false;

  durationInSeconds = 5

  openSnackBar(){
    this._snackBar.openFromComponent(NotFoundComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass:['mat-toolbar', 'dark-snackbar']
    });
  }
 
  

  ngOnInit(){
    this.sub1 = this.productsService.getProducts()
    .pipe(
      catchError((ee:any)=>{
        console.log('getproduct errerer', ee)
        this.openSnackBar()
        return EMPTY
      })
    )
    .subscribe((data)=>{
       this.products = data;
       this.isLoaded = true;
       console.log('products', this.products)
    })

    this.sub5 = this.productsService.getProductFromBasket()
    .subscribe((data)=>{
      this.basket = data;
     
      console.log('sub5', data)
    })
  }

  addToBasket(product:IProducts){
    product.quantity = 1;
     let findItem;

     if(this.basket.length > 0){
         findItem = this.basket.find((item:any)=> item.id === product.id);
         if(findItem) this.updateBasket(findItem);
         else this.postToBasket(product)
     }else{
      this.postToBasket(product)
     }
  }

  postToBasket(product:IProducts){
    this.productsService.postProductToBasket(product)
    .pipe(
      catchError((er:any)=>{
        this.openSnackBar()
        return EMPTY
      })
     )
    .subscribe((data)=>{
     this.basket.push(data)
        console.log('postbasket sub5', data)
    })
  }

  updateBasket(product:IProducts){
    product.quantity += 1;
     this.productsService.updateProductBasket(product)
     .pipe(
      catchError((er:any)=>{
        this.openSnackBar()
        return EMPTY
      })
     )
     .subscribe((data)=>{

     })
  }

  deleteItem(id:number){
       console.log(id)
       this.sub2 = this.productsService.deleteProduct(id)
       .pipe(
        catchError((er:any)=>{
          
          this.openSnackBar()
          return EMPTY
        })
       )
       .subscribe(()=>{
          this.products.find((item:any)=>{
              if(id === item.id){
                let idx = this.products.findIndex((item:any)=> item.id == id)
                 this.products.splice(idx,1)
              }
          })
          
       })
  }

  openDialog(product?:IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent,dialogConfig);

   

    dialogRef.afterClosed().subscribe((data)=> {
      if(data){
        if(data && data.id)
           this.updateData(data)
        else
           this.postData(data)
      }
      console.log('afterclosed', data)
    });
  }

  updateData(product:IProducts){
   this.sub3 = this.productsService.updateProduct(product)
    .subscribe((data)=> {
    this.products = this.products.map((product:any)=>{
      if(product.id === data.id) return data;
      else return product;
    });
       
    });
  }

  postData(data: IProducts) {
    this.sub4 = this.productsService.postProduct(data)
    .pipe(
      catchError((er:any)=>{
        console.log('error system', er)
        return EMPTY
      })
     )
    .subscribe((data)=> this.products.push(data));
  }
  
  
  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe()
    }

    if(this.sub2){
      this.sub2.unsubscribe()
    }

    if(this.sub3){
      this.sub3.unsubscribe()
    }

    if(this.sub4){
      this.sub4.unsubscribe()
    }

    if(this.sub5){
      this.sub5.unsubscribe()
    }
  }

}
