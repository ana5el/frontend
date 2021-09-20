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
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    let username: string = authenticationService.userValue!.username;
    console.log('USERNAME : ' + username);
    userService.getQrCode(username).subscribe((data) => {
      console.log(data);
      this.qrCode = data;
    });
  }

  ngOnInit(): void {
    this.userService
      .getByUsername(this.authenticationService.userValue!.username)
      .subscribe((data) => {
        console.log(data);
        this.currentUser = data;
      });
  }

  showIdAndName() {}
  showContactInfo() {}
  showOther() {}
}
