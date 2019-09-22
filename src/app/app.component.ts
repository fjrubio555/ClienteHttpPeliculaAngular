/*
    Componente básico de la aplicación.
*/
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Cliente Http de Pelicula en Angular';

  constructor(
    private router: Router,
    private toast: ToastrService,
  ) {}
  
}
