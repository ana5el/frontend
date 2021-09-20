import { CertificatResidenceComponent } from './services/certificat-residence/certificat-residence.component';
import { DrawingZoneComponent } from './drawing-zone/drawing-zone.component';
import { GaagComponent } from './gaag/gaag.component';
import { GuppComponent } from './gupp/gupp.component';
import { ShowAddrsComponent } from './gestion-adr/show-addrs/show-addrs.component';
import { GestionAdrComponent } from './gestion-adr/gestion-adr.component';
import { GestionAalComponent } from './gestion-aal/gestion-aal.component';
import { LogoutComponent } from './logout/logout.component';
import { TotpComponent } from './totp/totp.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './_models/role';
import { InfoPersonnelesComponent } from './services/certificat-residence/info-personneles/info-personneles.component';
import { AddCitoyenComponent } from './gestionCitoyen/add-citoyen/add-citoyen.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  { path: 'verify', component: TotpComponent },
  {
    path: 'gupp',
    component: GuppComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'gaag',
    component: GaagComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'aal',
    component: GestionAalComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  { path: 'drawing', component: DrawingZoneComponent },
  { path: 'gcitoyens', component: AddCitoyenComponent },
  { path: 'show-addrs', component: ShowAddrsComponent },
  { path: 'certificat-residence', component: CertificatResidenceComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
