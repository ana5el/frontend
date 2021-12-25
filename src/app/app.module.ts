import { HeaderComponent } from './header/header.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TotpComponent } from './totp/totp.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { GestionAalComponent } from './gestion-aal/gestion-aal.component';
import { ServicesComponent } from './services/services.component';
import { AddAalModalComponent } from './gestion-aal/add-aal-modal/add-aal-modal.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { GestionAdrComponent } from './gestion-adr/gestion-adr.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { ShowAddrsComponent } from './gestion-adr/show-addrs/show-addrs.component';
import { GuppComponent } from './gupp/gupp.component';
import { GaagComponent } from './gaag/gaag.component';
import { DrawingZoneComponent } from './drawing-zone/drawing-zone.component';
import { ProfilPrivillegesComponent } from './gupp/profil-privilleges/profil-privilleges.component';
import { UsersListComponent } from './gupp/users-list/users-list.component';
import { AddUserComponent } from './gupp/add-user/add-user.component';
import { CertificatResidenceComponent } from './services/certificat-residence/certificat-residence.component';
import { ProfilComponent } from './profil/profil.component';
import { InfoPersonnelesComponent } from './services/certificat-residence/info-personneles/info-personneles.component';
import { AddCitoyenComponent } from './gestionCitoyen/add-citoyen/add-citoyen.component';
import { IdAndNameComponent } from './profil/id-and-name/id-and-name.component';
import { ContactInfoComponent } from './profil/contact-info/contact-info.component';
import { UpdateUserComponent } from './gupp/update-user/update-user.component';
import { CitoyensListComponent } from './gestionCitoyen/citoyens-list/citoyens-list.component';
import {NgOtpInputModule} from "ng-otp-input";
import {NzCardModule} from "ng-zorro-antd/card";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    TotpComponent,
    LogoutComponent,
    HeaderComponent,
    GestionAalComponent,
    ServicesComponent,
    AddAalModalComponent,
    GestionAdrComponent,
    AddZoneComponent,
    ShowAddrsComponent,
    GuppComponent,
    GaagComponent,
    DrawingZoneComponent,
    ProfilPrivillegesComponent,
    UsersListComponent,
    AddUserComponent,
    CertificatResidenceComponent,
    ProfilComponent,
    InfoPersonnelesComponent,
    AddCitoyenComponent,
    IdAndNameComponent,
    ContactInfoComponent,
    UpdateUserComponent,
    CitoyensListComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.maps_api_key,
            libraries: ['places', 'drawing', 'geometry'],
        }),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false,
        }),
        NgOtpInputModule,
        NzCardModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: fr_FR },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
