import { CrServiceService } from './../../_services/cr-service.service';
import { I18nServiceService } from './../../_services/i18n-service.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificat-residence',
  templateUrl: './certificat-residence.component.html',
  styleUrls: ['./certificat-residence.component.css'],
})
export class CertificatResidenceComponent implements OnInit {
  addr: string = '';
  cin: string = '';
  form = new FormGroup({
    cin: new FormControl(null, Validators.required),
    nomFr: new FormControl('', Validators.required),
    prenomFr: new FormControl('', Validators.required),
    nomAr: new FormControl('', Validators.required),
    prenomAr: new FormControl('', Validators.required),
    dateNaissance: new FormControl(null, Validators.required),
    lieuNaisance: new FormControl('', Validators.required),
    profession: new FormControl(null, Validators.required),
    situation: new FormControl(null, Validators.required),
  });
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  constructor(
    private translate: TranslateService,
    private i18nService: I18nServiceService,
    private crService: CrServiceService
  ) {}
  ngOnInit(): void {
    this.i18nService.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
    this.translate.use('fr');
  }

  openPdf() {
    this.crService.download({ cin: this.cin });
  }
}
