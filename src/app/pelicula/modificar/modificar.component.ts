/*
    Este componente muestra el formulario de modificación de película, 
    valida la insercción de datos y llama al servicio de modficación.
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PeliculaService } from "../../services/pelicula.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  mpeliculaForm: FormGroup;
  peliculaID: any;
  peliculaData: any;

  constructor(
  private fb: FormBuilder,
  private peliculaService: PeliculaService,
  private router: Router,
  private actRoute: ActivatedRoute) 
  {
  //Validación de que los datos del formulario introduccidos por el usuario son correctos.
  this.mpeliculaForm = this.fb.group({
    titulo: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    director: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    estreno: ['', Validators.required]
  });

}

ngOnInit() {
  this.peliculaID = this.actRoute.snapshot.params['id']; //Coge el parámetro id de la url activa.
  this.cargarPeliculaInfo(this.peliculaID);
}

//Llamada al servicio getPeliById con el parametro establecido y volcados de datos desde la respuesta al formulario.
cargarPeliculaInfo(peliculaID){
  this.peliculaService.getPeliById(peliculaID).subscribe(pelicula => {
    this.peliculaData = pelicula.body;
    this.mpeliculaForm.controls['titulo'].setValue(this.peliculaData['titulo']);
    this.mpeliculaForm.controls['director'].setValue(this.peliculaData['director']);
    this.mpeliculaForm.controls['estreno'].setValue(this.peliculaData['estreno']);
    });
}

//Llamada al servicio updatePelicula con los valores del formulario.
modifPeliData(valores){
  this.peliculaService.updatePelicula(this.peliculaID, valores.titulo.trim(), valores.director.trim(), valores.estreno).subscribe(result=>{
  this.router.navigate(['']);
  })
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
