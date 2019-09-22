/*
    Módulo Película.

    En esté módulo se importa todos los componentes "secundarios" y asi no sobrecargar el módulo general.
    
*/

import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AnyadirComponent } from './anyadir/anyadir.component';
import { VistaComponent } from './vista/vista.component';
import { ModificarComponent } from './modificar/modificar.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    
    AnyadirComponent,
    VistaComponent,
    ModificarComponent,
    ErrorComponent,
    
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2500,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
  ],
 
  providers: [],
 
})
export class PeliculaModule { }
