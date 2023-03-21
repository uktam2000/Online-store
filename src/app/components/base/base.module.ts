import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppComponent } from "src/app/app.component";
import { ProductResolver } from "src/app/resolvers/product.resolver";
import { BasketComponent } from "../basket/basket.component";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsComponent } from "../products/products.component";
import { FooterComponent } from "../UI/footer/footer.component";
import { HeaderComponent } from "../UI/header/header.component";
import { BaseRoutingModule } from "./base-routing.module";
import { BaseComponent } from "./base.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        BaseComponent,
        HeaderComponent,
        FooterComponent,
        BasketComponent,
        DialogBoxComponent,
        ProductsComponent,
        ProductDetailsComponent
    ],
    imports: [
    CommonModule,
    BaseRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule
    ],
   providers:[
    
   ]
  })
  export class BaseModule { }