/*
    Servicio encargado de mostrar los mensajes de alertar
    segun el ngx-boostrap.
*/

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({

  providedIn: 'root'

})

export class NotificacionService {

  constructor(private toastr: ToastrService) { }

  MostrarSuceso(mensaje: string): void {

    this.toastr.success(mensaje, 'Ejecución');

  }

  MostrarError(mensaje: string): void {
    this.toastr.error(mensaje, 'Error');
  }

  MostrarAviso(mensaje: string): void {

    this.toastr.warning(mensaje, 'Aviso');

  }
  MostrarInformacion(mensaje: string): void {

    this.toastr.info(mensaje, 'Información');

  }

}
