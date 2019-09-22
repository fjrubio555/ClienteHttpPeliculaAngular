/*
    Servicio encargado de registrar los errores no tratados.
*/
import { Injectable } from '@angular/core';



@Injectable({

    providedIn: 'root'

})

export class LoggingService {



    logError(message: string, stack: string) {

        // Envia los errores del servidor aqui

        console.log('LoggingService: ' + message);

    }

}