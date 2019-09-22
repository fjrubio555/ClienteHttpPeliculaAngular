/*
    Servicio Principal de la Aplicación
    Donde se hace realmente la llamadas a los servicios RestFul del servidor
    asi como la capturas de los posibles errores y lanzamientos de los mismo.
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Pelicula } from './../interfaces/pelicula';
import { NotificacionService } from '../services/notificacion.services.service'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url = 'http://localhost:8080';
  public respuesta: any;
  constructor(
    private http: HttpClient,
    private toastr: NotificacionService
  ) { }

  //Lanzamiento del servicio getAllpelis.
  getAllpelis() {
    const path = this.url + '/getAllPeliculas';
    return this.http.get<Pelicula>(path, {observe: 'response'}) //nos devuleva la respuesta completa.
                    .pipe(catchError(this.errorHandler)); //capturar los errores.
  }

  //Lanzamiento del servicio getPelisbyId
  getPeliById(id: number) {
    const path = this.url + '/getPeliById?id=' + id;
    return this.http.get<Pelicula>(path,{observe: 'response'})
    .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio getPelisTitulo
  getPelisTitulo(titulo: string) {
    const path = this.url + '/getPelisTitulo?titulo=' + titulo;
    return this.http.get<Pelicula>(path,{observe: 'response'})
    .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio getPelisDirector
  getPelisDirector(director: string) {
    const path = this.url + '/getPelisDirector?director=' + director;
    return this.http.get<Pelicula>(path,{observe: 'response'})
    .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio getPelisEstreno
  getPelisEstreno(estreno: string) {
    const path = this.url + '/getPelisEstreno?estreno=' + estreno;
    return this.http.get<Pelicula>(path,{observe: 'response'})
    .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio addPelicula
  addPelicula(titulo: string, director: string, estreno: number) {
    const path = this.url + '/addPelicula?titulo=' + titulo.trim() + '&director=' + director.trim() + '&estreno=' + estreno;
    return this.http.get<Pelicula>(path,{observe: 'response'})
                          .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio deletePelicula
  deletePelicula(id: number) {
    const path = this.url + '/deletePelicula?id=' + id;
    return this.http.get<Pelicula>(path,{observe: 'response'})
    .pipe(catchError(this.errorHandler));
  }

  //Lanzamiento del servicio POST updatePelicula
  updatePelicula(id: number, titulo: string, director: string, estreno: number) {
    let params = new HttpParams; // Aqui se asigna todo el body del envio.
    params.append('id', id.toString()); //Se añade todos los parametros
    params.append('titulo', titulo.trim());
    params.append('director', director.trim());
    params.append('estreno', estreno.toString());
    const path = this.url + '/updatePelicula?id=' + id + '&titulo=' + titulo.trim() + '&director=' + director.trim() + '&estreno=' + estreno;
    return this.http.post(path, params,{observe: 'response'}) //al ser POST ruta, body, tipo de respuesta que queremos.
    .pipe(catchError(this.errorHandler));
  }

  //Recoge los errores y los lanza hacia el servicio de Errores.
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


}