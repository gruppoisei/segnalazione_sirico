import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCalendar, MatDatepicker, MatDatepickerInputEvent, MatDatepickerIntl} from '@angular/material/datepicker';
import { PersonaService } from '../../../service/persona.service';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/it';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dipendenti-commessa',
  templateUrl: './dipendenti-commessa.component.html',
  styleUrl: './dipendenti-commessa.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it' },
    provideMomentDateAdapter() // Imposta la localizzazione italiana
  ]
})
export class DipendentiCommessaComponent implements OnInit {

  pickerRequired: MatDatepicker<any> | MatCalendar<any> | undefined;
  assegnaCommessaForm!: FormGroup;

  listaCommesse: any[] = [];
  datiDipendenti: any[] = [];
  _datiDipendenti: any[] = [];
  dipendentiSelezionati : any[] = [];
  _dipendentiSelezionati : any [] = []
  checkBoxStatus: {[id: number]: boolean} = {};

  paginaCorrente: number = 1;
  elementiPerPagina: number = 10;
  _currentPage: number = 1;
  _elementiPerPagina: number = 10;
  totalPages : number = 0;
  _totalPages : number = 0;
  formDefaultValue: any;
  
constructor(private fb : FormBuilder, private personaService : PersonaService, private commessaService : CommessaService, private location : Location){
}
  ngOnInit(): void {
    this.assegnaCommessaForm = this.fb.group({
      commessa: ['', Validators.required],
      dateRange: this.fb.group({
        dataInizio: ['', Validators.required],
        dataFine: ['']}),
     /*  FlagOreLavorative : [true],
      oreGiornaliere : [8], */
    })
    this.getPersoneSocieta()
    this.getCommesse()
    this.formDefaultValue = this.assegnaCommessaForm.getRawValue()
  }

  salva() {
    const dataInizioMoment: moment.Moment = this.assegnaCommessaForm.get('dateRange.dataInizio')?.value;
    const dataFineMoment: moment.Moment = this.assegnaCommessaForm.get('dateRange.dataFine')?.value;
    const dataInizioDate: Date = this.convertiMomentInDate(dataInizioMoment);
    const dataFineDate: Date = this.convertiMomentInDate(dataFineMoment);

    console.log(dataInizioDate, dataFineDate )
    }

    convertiMomentInDate(momentObject: moment.Moment): Date {
      return momentObject.toDate();
    }

  nextPage(){
    if(this.paginaCorrente < this.getTotalPages()){
      this.paginaCorrente++;
      this.cambiaPagina(this.paginaCorrente); // Emetti l'evento per il cambio di pagina
    }
  }

  cambiaElementiPerPagina(itemsPerPage: number) {
    this.elementiPerPagina = itemsPerPage;
    this.caricaDatiPaginati();
  }

  cambiaPagina(page: number) {
    this.paginaCorrente = page;
    this.caricaDatiPaginati();
  }

  cambiaElementiPerPaginaDipendentiSelezionati(itemsPerPage: number) {
    this._elementiPerPagina = itemsPerPage;
    this.caricaDatiPaginati();
  }

  cambiaPaginaDipendentiSelezionati(page: number) {
    this._currentPage = page;
    this.caricaDatiPaginati();
  }

  caricaDatiPaginati() {
    const startIndex = (this.paginaCorrente - 1) * this.elementiPerPagina;
    const endIndex = startIndex + this.elementiPerPagina;
    this._datiDipendenti = this.datiDipendenti.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.datiDipendenti.length / this.elementiPerPagina);
  }

  goBack() {
    this.location.back();
  }

  clearForm() {
    this.assegnaCommessaForm.reset(this.formDefaultValue)
  }

  getCommesse() {
    this.commessaService.getAllVistaCommesse().subscribe(res => {
      this.listaCommesse = res
    })
  }

  getPersoneSocieta(){
    this.personaService.getPersoneSocieta().subscribe(res =>{
      this.datiDipendenti = res.sort((a: { ansoRagionesociale: string; },b: { ansoRagionesociale: string; }) => a.ansoRagionesociale > b.ansoRagionesociale ? 1:-1);
      this.totalPages = this.getTotalPages();
      this.caricaDatiPaginati()
    })
  }

  addDipendenteSelezionato(dipendente: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendente.anpePersonaid);
    if (index === -1) {
        this.dipendentiSelezionati.push(dipendente);
        this.checkBoxStatus[dipendente.anpePersonaid] = true;
    }
  }

  removeDipendenteSelezionato(dipendenteSelezionato: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendenteSelezionato.anpePersonaid);
    if (index !== -1) {
        this.dipendentiSelezionati.splice(index, 1);
        this.checkBoxStatus[dipendenteSelezionato.anpePersonaid] = false;
    }
  }

}
