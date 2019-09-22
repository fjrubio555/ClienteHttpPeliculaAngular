/*
    Servicio de Errores.

    Intercepta los envios y respueta del servidor
    y actua en consecuencia.
*/
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { LoggingService } from '../services/logging.services.service'
import { NotificacionService } from '../services/notificacion.services.service'
import { Router } from "@angular/router";


@Injectable()

export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  //Intercepar las Http respuesta, las cabeceras y los eventos observables.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const logger = this.injector.get(LoggingService); //Inyectamos a la constante el servicio de Logging
    const notificador = this.injector.get(NotificacionService); //Inyectamos a la constante el servicio de notificaciones

    let mensaje;
    let stackTrace;
    //Devolvemos la cabecera de la incidencia
    return next.handle(request).pipe(

      retry(1), //Reintentos
      map((event: HttpEvent<any>) => { //mapeamos los eventos Http.
        if (event instanceof HttpResponse) { //Comporobamos que es una respuesta Http.
            switch(event.status){
              case 200: //La respuesta nos dice que todo ha ido bien
                  if (event.url.indexOf('/deletePelicula') > -1){ //si hemos borrado el notificador nos lo indica.
                    mensaje='Película Borrada.'
                    notificador.MostrarSuceso(mensaje);
                  }else if (event.url.indexOf('/updatePelicula') > -1){ //si hemos modificado el notificador nos lo indica.
                    mensaje='Película Modificada.'
                    notificador.MostrarSuceso(mensaje);
                  }
                  break;
              case 201: //Todo ha ido bien y se añadido un registro nuevo tal y como esta establecido en el servicio Restful del servidor.
              mensaje = 'Película añadida.'
              notificador.MostrarSuceso(mensaje);
              this.router.navigate(['']);
              break;
            }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => { //capturamos los errores.

        if (error.error instanceof ErrorEvent) { //Error proveniente de algun evento se envia al servicio looging.
          logger.logError(mensaje, stackTrace);
          notificador.MostrarError(mensaje);
        } else {
          //Control de errores tanto en la parte del cliente como en el servidor.
          switch (error.status) {
            case 302:
              mensaje = 'La película ya existe.';
              notificador.MostrarInformacion(mensaje);
              this.router.navigate(['']);
              break;
            case 400:
                mensaje = 'No se ha podido realizar la busqueda.';
                notificador.MostrarInformacion(mensaje);
                this.router.navigate(['']);
                break;
            case 404:
              mensaje = 'Error. Página no encontrada.';
              notificador.MostrarError(mensaje);
              this.router.navigate(['error'])
              break;
            case 500:
              mensaje = 'Error. Conexion a Internet Fallida.';
              notificador.MostrarError(mensaje);
              this.router.navigate(['error'])
              break;
          }
        }
        return throwError(error); 
      }),
    );
  }
}
