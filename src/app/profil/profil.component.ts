import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  qrCode!: string;

  constructor(
    authenticationService: AuthenticationService,
    userService: UserService
  ) {
    let username: string = authenticationService.userValue!.username;
    console.log('USERNAME : ' + username);
    userService.getQrCode(username).subscribe((data) => {
      console.log(data);
      this.qrCode = data;
    });
  }

  ngOnInit(): void {}

  showIdAndName() {}
  showContactInfo() {}
  showOther() {}
}
