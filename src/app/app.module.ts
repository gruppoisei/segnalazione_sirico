import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { CalendarioComponent } from './pages/rapportino/calendario/calendario.component';
import { GiornoCalendarioComponent } from './pages/rapportino/giorno-calendario/giorno-calendario.component';
//import { AttivitaGiornoComponent } from './pages/rapportino/attivita-giorno/attivita-giorno.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichiestaAssenzaUtenteComponent } from './pages/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { MenuComponent } from './menu/menu.component';
import { ForgotPasswordComponent } from './pages/forgot-password-dialog/forgot-password/forgot-password.component';
import { ResponseDialogComponent } from './ui/response-dialog/response-dialog/response-dialog.component';
import { ErrorLoginDialogComponent } from './ui/error-login-dialog/error-login-dialog.component';
// import { AggiungiAttivitaComponent } from './pages/rapportino/aggiungi-attivita/aggiungi-attivita.component';
// import { AggiungiAssenzaComponent } from './pages/rapportino/aggiungi-assenza/aggiungi-assenza.component';
// import { AggiungiReperibilitaComponent } from './pages/rapportino/aggiungi-reperibilita/aggiungi-reperibilita.component';
import { ListaAttivitaComponent } from './pages/rapportino/lista-attivita/lista-attivita.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ResponseResetPasswordDialogComponent } from './ui/response-reset-password-dialog/response-reset-password-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    InsertUtenteComponent,
    InsertPersonaComponent,
    LoginComponent,
    HomepageComponent,
    CalendarioComponent,
    GiornoCalendarioComponent,
    RichiestaAssenzaUtenteComponent,
    RichiestaAssenzaSegreteriaComponent,
    MenuComponent,
    ForgotPasswordComponent,
    ResponseDialogComponent,
    ErrorLoginDialogComponent,
    // AggiungiAttivitaComponent,
    // AggiungiAssenzaComponent,
    // AggiungiReperibilitaComponent,
    ListaAttivitaComponent,
    ResponseResetPasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
    
    

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
