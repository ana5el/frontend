import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../_services/authentication.service';
import { TokenStorageService } from './../_services/token-storage.service';
import {Component, OnInit, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css'],
})
export class TotpComponent implements OnInit {
  totpForm!: FormGroup;
  error: string = '';

  @ViewChildren('ngOtpInput') ngOtpInput: any;
  otp!: string;
  config = {
    allowNumbersOnly: true,
    length: 6,
    disableAutoFocus: false,
  };
  constructor(
    private tokenStrorageService: TokenStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {
    this.totpForm = formBuilder.group({
      code: ['', Validators.required],
    });
  }

  public get f() {
    return this.totpForm.controls;
  }
  ngOnInit(): void {
    const currentuser = this.authenticationService.userValue;
    if (!currentuser) {
      this.router.navigate(['/login']);
    }
    if (currentuser && currentuser.authenticated === true) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.authenticationService.verify(this.otp).subscribe(
      (next) => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.showMessage(
          'error',
          'Le code de vérification est incorrect. Réessayez'
        );
      }
    );
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg);
  }


  onOtpChange(otp:string) {
    this.otp = otp;
    console.log(this.otp)
  }
}
