import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gestione-dipendente',
  templateUrl: './gestione-dipendente.component.html',
  styleUrl: './gestione-dipendente.component.scss'
})

export class GestioneDipendenteComponent implements OnInit{

  ricercaForm!: FormGroup;
  constructor(private fb : FormBuilder){}

  ngOnInit(): void {

    this.ricercaForm = this.fb.group({
      nome : [''],
      cognome : [''],
      codiceFiscale : [''],
      comuneResidenza : [''],
      emailAziendale : [''],
      societa : ['']
  })
   }

  clearSearch()
  {
    this.ricercaForm.reset();
  }
      
  ricercaFiltrata()
  {

  }

}
