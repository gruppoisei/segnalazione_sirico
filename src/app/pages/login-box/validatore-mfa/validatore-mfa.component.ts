import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  statoAccesso,
} from '../../../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { SelezionaRuoloDialogComponent } from '../seleziona-ruolo-dialog/seleziona-ruolo-dialog.component';

@Component({
  selector: 'app-validatore-mfa',
  templateUrl: './validatore-mfa.component.html',
  styleUrl: './validatore-mfa.component.scss',
})
export class ValidatoreMFAComponent {
  expire1week = false;

  codiceValidatore = '';

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ConfermaMFA() {
    this.auth
      .ConfermaMFA(this.codiceValidatore, this.expire1week)
      .subscribe((res) => {
        console.log(res);
        switch (res.status) {
          case statoAccesso.utenteLoggato:
            this.auth.utente = res.body;
            this.router.navigate(['/homepage']);
            break;
          case statoAccesso.credenzialiValide:
            this.auth.utenteId = res.body.userId;
            this.auth.listaRuoliUtente = res.body.listaRuoli;
            this.dialog.open(SelezionaRuoloDialogComponent, {
              width: 'auto',
              height: 'auto',
            });
            break;
          default:
            alert('errore inserimento codice verifica');
            break;
        }

        // //se utente ha correttamente verificato il codice redirect dentro il sito e creo variabile utente loggato
        // if (res.status == statoAccesso.utenteLoggato) {
        //   debugger;
        //   this.auth.utente = res.body;
        //   this.router.navigate(['/homepage']);
        // } else if (this.auth.status == statoAccesso.credenzialiValide) {
        //   this.auth.utenteId = res.body.userId;
        //   this.auth.listaRuoliUtente = res.body.listaRuoli;
        //   this.dialog.open(SelezionaRuoloDialogComponent, {
        //     width: 'auto',
        //     height: 'auto',
        //   });
        //   //se errore redirect al login
        // } else {
        //   alert('errore inserimento codice verifica');
        // }
      });
  }
}
