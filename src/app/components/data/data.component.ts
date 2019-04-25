import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  forma: FormGroup;


  usuario: Usuario = {
    nombrecompleto: {
      nombre: 'Pedro',
      apellido: 'Isaza'
    },
    correo: 'pisaza@unal.edu.co'
  }

  constructor() {

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required,
                                       Validators.minLength(3)]),
        'apellido': new FormControl('', Validators.required)
      }),
      'correo': new FormControl('', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
      )
    });

    //Carga objeto por defecto.
    this.forma.setValue(this.usuario);
  }

  ngOnInit() {


  }

  guardarCambios() {

    console.log(this.forma.value);
    console.log(this.forma);

    this.forma.reset({
      nombrecompleto: {
        nombre: "",
        apellido: ""
      },
      correo: ""
    });
  }

}



export interface Usuario {
  nombrecompleto: {
    apellido: string;
    nombre: string;
  }
  correo: string;
}
