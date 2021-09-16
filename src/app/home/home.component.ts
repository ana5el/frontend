import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string;
  roles: string[] = [];

  constructor(private authenticationService: AuthenticationService) {
    
    this.username = this.authenticationService.userValue?.username!;
    this.roles = this.authenticationService.userValue?.authorities!;
  }

  ngOnInit(): void {}
}
