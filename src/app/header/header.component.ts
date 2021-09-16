import { I18nServiceService } from './../_services/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentuser!: User | null;
  @Input() isAdmin!: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    this.authenticationService.user.subscribe((x) => (this.currentuser = x));
  }

  ngOnInit(): void {
    this.i18nService.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
    this.translate.use('fr');
  }

  logout() {
    this.authenticationService.logout();
  }

  changeLocal() {
    if (this.translate.currentLang === 'fr') this.i18nService.changeLocal('ar');
    else this.i18nService.changeLocal('fr');
  }
}
