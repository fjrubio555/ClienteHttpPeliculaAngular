/*
  Módulo Enroutador. Dónde se establecen las diferentes rutas
  de navegación de la aplicación.
  
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnyadirComponent } from './pelicula/anyadir/anyadir.component';
import { VistaComponent } from './pelicula/vista/vista.component';
import { ModificarComponent } from './pelicula/modificar/modificar.component'; 
import { ErrorComponent } from './pelicula/error/error.component';

const routes: Routes = [
  {path: '', component: VistaComponent},
  {path: 'modificar/:id', component: ModificarComponent},
  {path: 'anyadir', component: AnyadirComponent},
  {path: 'error', component: ErrorComponent },
  {path: 'consulta', component: VistaComponent},
  {path: 'consulta/:id', component: VistaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
