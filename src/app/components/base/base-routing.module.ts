
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductResolver } from "src/app/resolvers/product.resolver";
import { AuthGuard } from "src/app/services/auth-guard.guard";
import { BasketComponent } from "../basket/basket.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsComponent } from "../products/products.component";
import { BaseComponent } from "./base.component";

const Baseroutes:Routes = [
    {path:'', component:BaseComponent, children:[
        {path:'', redirectTo: '/home/products', pathMatch:'full'},
        {path:'basket', component:BasketComponent},
        {path:'products', component:ProductsComponent},
        {path:'product/:id', component:ProductDetailsComponent, resolve:{data:ProductResolver}},
        // {path:'**', component:NotFoundComponent} 
    ]}, 
   
]

@NgModule({
    imports:[RouterModule.forChild(Baseroutes)],
    exports:[RouterModule]
})
export class BaseRoutingModule{}