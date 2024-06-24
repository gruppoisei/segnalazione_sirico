import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NuovoUtenteRequest } from '../dto/request/nuovoUtenteRuolo';

@Injectable({
  providedIn: 'root',
})

export class InsertUtenteService {


  modalType?: string | null;

  utenteId?: number;
  utenteId$: BehaviorSubject<number> = new BehaviorSubject<number>(this.utenteId!);

  fieldAutoFill!: number;
  fieldAutoFill$: BehaviorSubject<any> = new BehaviorSubject<any>(this.fieldAutoFill);

  constructor(private Http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  persone: PersoneEntity[] = [];

  // GET PERSONA BY ID
  GetById(id: number): Observable<PersoneEntity> {
    return this.Http.get<PersoneEntity>(
      'http://localhost:5112/Persone/GetPersoneById/' + id
    );
  }
/*
  // INSERIMENTO PERSONA
  addPersona(persona: PersoneEntity): Observable<PersoneEntity> {
    if (persona.datanascita == null || persona.datanascita == '') {
      persona.datanascita = '0001-01-01';
    }
    //console.log(persona.datanascita);
    //console.log(persona);
    var body = JSON.stringify(persona);
    console.log(body);

    return this.Http.post<PersoneEntity>(
      'http://localhost:5112/Persone/InserimentoPersona/',
      body,
      this.httpOptions
    );
  }
*/
  // GET ALL PERSONE
  GetAll(): Observable<PersoneEntity> {
    return this.Http.get<PersoneEntity>(
      'http://localhost:5112/Persone/GetAllPersone'
    );
  }

  GetAllRuoli() {
    return this.Http.get<any>('http://localhost:5143/AmministrazioneRuolo/GetRuoli?nomeRuolo=null', this.httpOptions);
  }

  GetAllInfoUtenteRuoloById(userId: number) {
    return this.Http.get<any>('http://localhost:5143/AmministrazioneRuolo/GetAllInfoRuoliUtenteById?userId=' + userId)
  }

  ConfermaNuovoUtenteModificaRuolo(utenteDaAggiungere: NuovoUtenteRequest) {
    return this.Http.post<any>('http://localhost:5143/AmministrazioneRuolo/AssociaRuoliAUtente', utenteDaAggiungere, this.httpOptions)
  }


  GetAllPersoneSenzaUtenza(filtro: any) {
    return this.Http.post<any>('http://localhost:5143/AmministrazioneRuolo/GetAllPersoneSenzaUtente', filtro)
  }
  GetRuoli(nomeRuolo?: string) {  // caso ricerca filtrata    
    if (nomeRuolo != '' && nomeRuolo != null && nomeRuolo != undefined) {
      return this.Http.get<any[]>('http://localhost:5143/AmministrazioneRuolo/GetRuoli?nomeRuolo=' + nomeRuolo);
    }
    else {  // caso nomeRuolo = '', ricerca NON filtrata
      console.log('caso ricerca non filtrata');
      return this.Http.get<any[]>('http://localhost:5143/AmministrazioneRuolo/GetRuoli?nomeRuolo=null');
    }    
  }

  getPersonaFiltrata(nome: string, cognome: string, ruoloId: number) {
    let url = 'http://localhost:5143/AmministrazioneRuolo/GetUtentiERuoli?';
    if (nome) {
      url += 'nome=' + nome + '&';
    }
    if (cognome) {
      url += 'cognome=' + cognome + '&';
    }
    if (ruoloId) {
      url += 'ruoloId=' + ruoloId;
    }

    return this.Http.get<any[]>(url);
  }

}

export interface PersoneEntity {
  id: number;
  nome: string;
  cognome: string;
  datanascita: string;
  stipendio: number;
  genereid: number;
  societaid: number;
  ruoloid: number;
}
