/*
  El componente Vista, es el componente central de esta aplicación.

  Básicamente aqui se encuentra casi todo la lógica de la aplicación.

*/
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, AfterViewInit, TemplateRef } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { Subject} from 'rxjs';
import { Router} from "@angular/router";
import { NgbModal, ModalDismissReasons, NgbModalOptions,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Globals} from '../../globals';

declare var $; //declaramos "$" para poder usar las variables jquerys.

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit, OnDestroy {
  
  public todasPelis: any = [];
  public sPelicula: any;
  //Esta etiqueta nos permite llamar a un elemento de DOM del HTML.
  @ViewChild('#peliculaTabla', { static: false }) Tabla: ElementRef;
  @ViewChild('#buscador', { static: false }) elementView: ElementRef;
  @ViewChild('#bntBuscar', { static: false }) btnbuscar: ElementRef;
  public dataTable: any;
  dtTrigger: Subject<any> = new Subject(); //Desencadenante del datatable.
  dtOptions: DataTables.Settings = {}; //Opciones del datatable.
  dtInstance: DataTables.Api; //Instancia del datatable.
  private peliSelect: any;
  private isDisabled = true;
  private modalRef: null;
  //Esta etiqueta nos permite insertar el valor de la variable en el DOM de HTML
  @Input() modal_titulo;
  @Input() moda_texto_def;
  @Input() modal_texto_cab;
  closeResult: string;
  private busqueda: string;
  private modalOptions: NgbModalOptions;
  constructor(
    private peliculaService: PeliculaService,
    private router: Router,
    private modalService: NgbModal,
    private globals: Globals
  ) {
    this.modalOptions = {
      backdrop: false, //Sin fondo detras de las ventana modales.
    }
  }
  
  ngOnInit(): void {
    
    this.cargarTexto();  //Cargar los textos de la ventana modal
    this.cargarPeliculas(); //Cargar los datos de la Tabla.

  };

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); //Desubcribir del desencadenante de la datatable.
    
  }
  
 //Carga y configura el datatable.
  cargarPeliculas() {
    this.dtOptions = { //Opciones de configuración del datatable
      "destroy": true,
      "paging": true,
      "info": true,
      "ordering": false,
      "searching": false,
      "pagingType": 'full_numbers',
      "pageLength": 5,
      "language": {
        "emptyTable": "No existen películas en la tabla",
        "info": "Mostrando _START_ de _END_ de _TOTAL_ películas",
        "infoEmpty": "Mostrando 0 de 0 de 0 películas",
        "lengthMenu": "Mostrar _MENU_ películas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "No se encontraron películas",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      "processing": true,
    };
    //Se destruye el datatable existen.
    $('#peliculaTabla').dataTable().fnDestroy();
    if ($.fn.DataTable.isDataTable(this.Tabla)) {
      $(this.Tabla).dataTable().fnDestroy();
      this.dtTrigger.next();
    }
    //Se examina en que ruta esta.
    if (!((this.globals.varNab==='1') || (this.globals.varNab==='2') || (this.globals.varNab==='3'))){
      this.getAllpelis();
    } else {
      this.isDisabled = false; //Si la url es la titulo, director y estreno activamos el boton de buscar.
    }
  }
  //Llama al servicio getAllpelis.
  getAllpelis() {
    this.peliculaService.getAllpelis()
      .subscribe(
        peliculas => {
          this.todasPelis = peliculas.body; 
          this.cargarTabla(); //Llamada la carga del dataTable.
        });

  }

  //Llama al servicio getPeliById.
  getPeliById(id) {
    this.peliculaService.getPeliById(id)
      .subscribe(pelicula => {
        this.sPelicula = pelicula.body;
      })
  }

  //Llama al servicio getPelisTitulo.
  getPelisTitulo(titulo) {
    this.peliculaService.getPelisTitulo(titulo)
      .subscribe(peliculas => {
        this.cargarTabla();
        this.todasPelis = peliculas.body; 
      })
  }

  //Llama al servicio getPelisDirector.
  getPelisDirector(director) {
    this.peliculaService.getPelisDirector(director)
      .subscribe(peliculas => {
        this.cargarTabla();
        this.todasPelis = peliculas.body; 
      })
  }

  //Llama al servicio getPelisEstreno.
  getPelisEstreno(estreno) {
    this.peliculaService.getPelisEstreno(estreno)
      .subscribe(peliculas => {
        this.cargarTabla();
        this.todasPelis = peliculas.body; 
      })
  }

  //Vincula el dataTable al objeto del DOM del HTML
  //Carga los datos y la configuración del dataTable.
  //Renderiza la dataTable.
  cargarTabla() {
   
    this.dataTable = $(this.Tabla);
    this.dataTable.DataTable();
    this.dtTrigger.next();
  }

  //Llama al servicio addPelicula.
  addPelicula(titulo, director, estreno) {
    this.peliculaService.addPelicula(titulo, director, estreno)
      .subscribe(
        (pelicula) => {
        this.sPelicula = pelicula.body;
      });
  }

  //Llama al servicio deletePelicula.
  deletePelicula(id) {
    this.peliculaService.deletePelicula(id)
      .subscribe(pelicula => {
        setTimeout(() => {
          this.dataTable.DataTable().clear();
          this.cargarPeliculas();
        }, 200);

      })
  }

  //Llama al servicio updatePelicula.
  updatePelicula(id, titulo, director, estreno) {
    this.peliculaService.updatePelicula(id, titulo, director, estreno)
      .subscribe(pelicula => {
        this.sPelicula = pelicula
      })
  }

  //Coge y Envia el identificador de la fila seleccionada.
  setPeliSelect(id) {
    this.peliSelect = id;
  }

  getPeliSelect() {
    return this.peliSelect;
  }

  //Según la url carga los texto del modal segun corresponda.
  cargarTexto() {
    switch (this.globals.varNab) {
      case '1':
        this.modal_titulo = 'Búsqueda por Título';
        this.moda_texto_def = 'Título';
        this.modal_texto_cab = 'Título';
        break;
      case '2':
        this.modal_titulo = 'Búsqueda por Director';
        this.moda_texto_def = 'Director';
        this.modal_texto_cab = 'Director';
        break;
      case '3':
        this.modal_titulo = 'Búsqueda por Año de Estreno';
        this.moda_texto_def = 'Año de Estreno';
        this.modal_texto_cab = 'Año de Estreno'
        break;
    }
    
  }
  

  //Muestra la ventana modal de busquedas, según las configuracion establecida.
  //y se descrimina la razón de su cierre.
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `${result}`;
    }, (motivo) => {
      this.closeResult = `${this.getRazonSalida(motivo)}`;
      
    });
  }

  //Se establece que hacer según la salida.
  private getRazonSalida(motivo: any): void {
    
    if ((motivo === ModalDismissReasons.ESC) || (motivo === ModalDismissReasons.BACKDROP_CLICK) ||
      (motivo === 'Cerrar') || (motivo === 'Cancelar')) {
      this.router.navigate(['']);
    } else if (motivo === 'Buscar') {
      switch (this.globals.varNab) {
        case '1':
          this.getPelisTitulo(this.busqueda); //Llamada al servicio getPelisTitulo
          break;
        case '2':
          this.getPelisDirector(this.busqueda); //Llamada al servicio getPelisDirector
          break;
        case '3':
          this.getPelisEstreno(this.busqueda); //Llamada al servicio getPelisEstreno
          break;
      }
    } else {
      this.router.navigate(['']);
    }

  }

  //Permite la Navegación 
  getNavegacion(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
    
  }
}
