import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import { LandingComponent } from './core/landing/landing.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
