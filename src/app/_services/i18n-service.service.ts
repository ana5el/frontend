import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nServiceService {
  localEvent = new Subject<string>();
  constructor(private translate: TranslateService) {}
  changeLocal(locale: string) {
    this.translate.use(locale);
    this.localEvent.next(locale);
  }
}
