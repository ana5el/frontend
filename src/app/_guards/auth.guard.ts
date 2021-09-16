import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    const currentUser = this.authenticationService.userValue;
    if (currentUser) {
      if (currentUser.authenticated === true) {
        if (
          route.data.roles &&
          !currentUser.authorities.some((role) =>
            route.data.roles.includes(role)
          )
        ) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/verify']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
