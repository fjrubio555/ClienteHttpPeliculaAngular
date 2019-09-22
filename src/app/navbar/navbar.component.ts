/*

Este componente se encarga de la navegación de la barra de navegación


*/
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Globals} from '../globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private router: Router,
    private globals: Globals
  ) { }

  ngOnInit() {
  }
  //Permite la navegación de la barra de navegación
  getNavegacion(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
    
  }
  //Envia un valor a la variable de navegación global. Utilizada para
  //sacar correstamente los textos del modal de busqueda.
  public setVarNab(id){
    this.globals.varNab=id;
    this.router.routeReuseStrategy.shouldReuseRoute = ( ) => false; this.router.navigate([this.router.url]);
  }

  //Coge la variable de Navegación.
  public getVarNab(){
    return this.globals.varNab;
  }  
}
