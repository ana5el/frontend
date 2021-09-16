import { I18nServiceService } from './_services/i18n-service.service';
import { AuthenticationService } from './_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { Role } from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentuser!: User | null;
  //isAdmin: boolean = false;
  direct: 'ltr' | 'rtl' = 'ltr';
  constructor(
    private authenticationService: AuthenticationService,
    private i18nService: I18nServiceService
  ) {
    this.authenticationService.user.subscribe((x) => (this.currentuser = x));
  }

  ngOnInit(): void {
    this.i18nService.localEvent.subscribe((locale) => {
      if (locale === 'ar') {
        this.direct = 'rtl';
      } else {
        this.direct = 'ltr';
      }
    });
  }

  isAuthenticated() {
    return this.currentuser && this.currentuser.authenticated;
  }
  isAdmin(): boolean {
    if (this.currentuser)
      return this.currentuser.authorities.includes(Role.admin);
    return false;
    // return (
    //   this.currentuser && this.currentuser.authorities.includes(Role.admin)
    // );
  }

  logout() {
    this.authenticationService.logout();
  }
}
