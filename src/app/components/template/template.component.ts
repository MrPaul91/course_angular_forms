import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {


  usuario: Usuario = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "Colombia",
    sexo: "Hombre",
    acepta: false
  }

  paises = [{
      codigo: "CRI",
      nombre: "Costa Rica"
    },
    {
      codigo: "ESP",
      nombre: "España"
    },
    {
      codigo: "COL",
      nombre: "Colombia"
    }


  ]


  constructor() { }

  ngOnInit() {
    console.log(this.usuario.apellido);
  }

  guardar(forma: NgForm) {

    console.log("Formulario!!!");
    console.log("ngForm ", forma);
    console.log("Valor", forma.value);
    console.log("usuario", this.usuario);

  }

}


export interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  pais: string;
  sexo: string;
  acepta: boolean
}
