/* 
    Este componente Muestra el formulario de Añadir Pelicula
    Valida los datos de insercción y envia los parámetros
    necesarios para añadir la película.
*/
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { PeliculaService } from '../../services/pelicula.service';
import {Router} from "@angular/router";

declare var $;

@Component({
  selector: 'app-anyadir',
  templateUrl: './anyadir.component.html',
  styleUrls: ['./anyadir.component.css']
})
export class AnyadirComponent implements OnInit {
  peliculaForm: FormGroup;
  pelicula: any;
  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private router: Router
  ) {
    this.peliculaForm = this.fb.group ({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
      director: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
      estreno: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  //Llama al servicio addPelicula pasandole los valores del formulario y redirecciona hacia la url de inicio.
  salvarPelicula(valores){
    this.peliculaService.addPelicula(valores.titulo,valores.director,valores.estreno).subscribe(pelicula=>{
        this.router.navigate(['']);

    });
  }
   //Permite la navegación
  getNavegacion(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
  }
}
