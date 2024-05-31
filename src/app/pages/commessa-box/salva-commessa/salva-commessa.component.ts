import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { SocietaService } from '../../../service/societa.service';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import FormattaData from '../../../helpers/formattaData';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';
@Component({
  selector: 'app-salva-commessa',
  templateUrl: './salva-commessa.component.html',
  styleUrl: './salva-commessa.component.scss'
})

export class SalvaCommessaComponent implements OnInit, OnDestroy {

  titolo: string;
  commessaForm !: FormGroup
  isDisabled: boolean = true;
  formDefaultValue: any;
  minDataScadenza?: string
  utenteLoggato: string | null = ""
  listSocieta: any
  listTipoCommisione: any;
  listClienti: any
  listTipoCommessa: any;
  inModifica: boolean = false;

  constructor(
    private commessaService: CommessaService, private location: Location,
    private formBuilder: FormBuilder, private dialog: MatDialog,
    private societaService: SocietaService, private clientiService: InsertContrattoService,
    private router: Router, public menuDinamicoService: MenuDinamicoService) {
    
    //  const router = inject(Router)

    this.titolo = this.commessaService.getTitolo();
    if (this.titolo === '') {
      this.router.navigate(['/gestione-commessa'])
      // this.router.navigate(['/' + this.menuDinamicoService.finalPath.substring(0, this.menuDinamicoService.finalPath.lastIndexOf("/") + 1)]);
    }
  }

  ngOnInit(): void {
    this.loadData()
    this.commessaForm = this.formBuilder.group({
      CommessaId: [0],
      DescCommessa: ['', Validators.required],
      idTipoCommessa: ['', Validators.required],
      idSocieta: ['', Validators.required],
      idClienteDiretto: [''],
      idClienteFinale: [''],
      DataInizio: ['', Validators.required],
      DataFine: [{ value: '', disabled: true }],
      note: [''],
      FlagAttivo: [true],
      SysUser: [this.utenteLoggato]
    })
    this.formDefaultValue = this.commessaForm.getRawValue()
    this.commessaForm.get('DataInizio')?.valueChanges.subscribe(value => {
      if (value) {
        this.commessaForm.get('DataFine')?.enable();
        const selectDate = new Date(value);
        this.minDataScadenza = selectDate.toISOString().split('T')[0]
      }
      else {
        this.commessaForm.get('DataFine')?.disable();
      }
    });

    this.commessaService.commessa$.subscribe((commessa) => {
      if (commessa) {
        this.inModifica = true;
        this.populateForm(commessa);
      }
    });

    this.menuDinamicoService.getPermissionFlag();  
  }


  ngOnDestroy() {
    this.commessaService.clearCommessaSubject();
  }

  salvaCommessa() {
    if (this.commessaForm.valid) {
      if (this.commessaForm.get('DataFine')?.value === '') {
        this.commessaForm.patchValue({
          DataFine: null
        })
      }
      if (this.commessaForm.get('idClienteDiretto')?.value === '' && this.commessaForm.get('idClienteFinale')?.value === '') {
        this.commessaForm.patchValue({
          idClienteDiretto: null,
          idClienteFinale: null
        })
      }
      this.commessaService.salvaCommessa(this.commessaForm.value).subscribe(
        {
          next: (res) => {
            this.dialog.open(MessageResponseDialogComponent,
              {
                data: { successMessage: res.message },
                width: 'auto',
                height: 'auto'
              });
            this.clearForm()
          },
          error: (err) => {
            this.dialog.open(MessageResponseDialogComponent,
              {
                data: { errorMessage: err?.error.message },
                width: 'auto',
                height: 'auto'
              });
          }
        });
    }
    else {
      ValidateForm.validateAllFormFields(this.commessaForm);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto'
        });
    }
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['/' + this.menuDinamicoService.finalPath.substring(0, this.menuDinamicoService.finalPath.lastIndexOf("/") + 1)]);
  }

  clearForm() {
    this.commessaForm.reset(this.formDefaultValue)
  }

  loadData() {
    this.utenteLoggato = sessionStorage.getItem('SysUser')
    this.societaService.getAllSocieta().subscribe(societa => this.listSocieta = societa);
    this.commessaService.getAllTipoCommesse().subscribe(tipoCommessa => this.listTipoCommessa = tipoCommessa)
    this.clientiService.getAllClienti().subscribe(clienti => this.listClienti = clienti)
  }

  populateForm(comessa: any) {
    const dataInizio = FormattaData.formattaData(comessa.dataInizio);
    const dataFine = FormattaData.formattaData(comessa.dataFine);

    this.commessaForm.patchValue({
      CommessaId: comessa.commessaId,
      DescCommessa: comessa.descCommessa,
      idTipoCommessa: comessa.idTipoCommessa,
      idSocieta: comessa.idSocieta,
      idClienteDiretto: comessa.idClienteDiretto,
      idClienteFinale: comessa.idClienteFinale,
      DataInizio: dataInizio,
      DataFine: dataFine,
      note: comessa.note,
      FlagAttivo: comessa.flagAttivo,
    })
  }

}
