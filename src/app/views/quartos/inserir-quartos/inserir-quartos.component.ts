import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inserir-quartos',
  templateUrl: './inserir-quartos.component.html',
  styleUrls: ['./inserir-quartos.component.scss']
})
export class InserirQuartosComponent implements OnInit{
  form!: FormGroup;


  constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.form = this.fb.group({
      number: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      decription: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
    });
  }

  gravar(){}

}
