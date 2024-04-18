// app.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from './service/authentication.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /* animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ] */
})

export class AppComponent {
  isDropdownOpen: boolean = false;
  selectedItem: string = '';

  constructor(private router: Router, private authService : AuthenticationService,public loadingSerive:LoadingService){ 
    // verToken 
    authService.ValidateTokenAsync()
  }

  toggleDropdown(){
    alert("ok")
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemClick(item: string) {
    this.selectedItem = item;
    this.isDropdownOpen = false;
    this.router.navigateByUrl(item);
  }
}


// export const verToken = async () => {
//   const authService = inject(AuthenticationService)
//   const response =  await firstValueFrom(authService.ValidateToken())
// }