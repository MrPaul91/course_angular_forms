import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  forma: FormGroup;


  usuario: Usuario = {
    nombrecompleto: {
      nombre: 'test',
      apellido: 'test'
    },
    correo: 'testing@unal.edu.co',
    password1: '',
    password2: '',
    username: '',
    pasatiempos: ['']


  }

  constructor() {

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noVillegas])
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(''),
      'pasatiempos': new FormArray([new FormControl('Correr', Validators.required)]),
      'username': new FormControl('', Validators.required, this.existeUsuario)
    });


    this.forma.controls['password2'].setValidators(
      [Validators.required, this.noIgualPass2.bind(this.forma)]
    );

    //Detecta los  cambios. La funcion se dispara cada vez que un valor cambie.
  /*   this.forma.valueChanges.subscribe(
      data => {
        console.log(data);
      }
    )
 */

    this.forma.controls['username'].valueChanges.subscribe(

      user => {
        console.log(user);
      }
    )


    this.forma.controls['username'].statusChanges.subscribe(

      status => {
        console.log(status);
      }
    )

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

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required));
  }


  noVillegas(control: FormControl): { [s: string]: boolean } {
    if (control.value === "mendoza") {
      return {
        novillegas: false
      }
    }
    return null;
  }


  noIgualPass2(control: FormControl): { [s: string]: boolean } {

    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {

      return {
        noiguales: true
      }
    }
    return null;
  }


  existeUsuario(control: FormControl): Promise<any> | Observable<any> {

    let promesa = new Promise(
      (resolve, reject) => {

        setTimeout(() => {
          if (control.value === 'pablo') {
            resolve( { existe: true});
          }
          else{
            resolve( null )
          }
        }, 3000 )
      }
    )

    return promesa;
  }
}


export interface Usuario {
  nombrecompleto: {
    apellido: string;
    nombre: string;
  }
  correo: string;
  password1: string;
  password2: string;
  pasatiempos: string[]
  username: string


}
