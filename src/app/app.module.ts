/*
  Módulo General de la Aplicación.

  Se importan y se declarán los módulos básicos para el buen funcionamiento
  de la aplicación.
  
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeliculaModule } from './pelicula/pelicula.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ServerErrorInterceptor } from './interceptor/server-error.interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Globals} from './globals';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PeliculaModule,
  ],

  providers: [ Globals,
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],

})
export class AppModule { }