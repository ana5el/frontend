import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Point } from '../_models/point';
import { UserService } from '../_services/user.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-gupp',
  templateUrl: './gupp.component.html',
})
export class GuppComponent {
  isVisible: boolean = false;
  tabs = [1, 2, 3];

  @ViewChild(AddUserComponent) child!: AddUserComponent;

  constructor(private userService: UserService) {}

  handleCancel() {
    this.isVisible = false;
  }

  createUser() {
    console.log(this.child.form.value);
    this.userService
      .create({
        login: this.child.form.get('username')?.value,
        password: this.child.form.get('password')?.value,
        profileId: this.child.form.get('profile')?.value,
        gradeId: this.child.form.get('grade')?.value,
        nom: this.child.form.get('nom')?.value,
        prenom: this.child.form.get('prenom')?.value,
        cin: this.child.form.get('cin')?.value,
        tel: this.child.form.get('tel')?.value,
        aalId: this.child.form.get('aal')?.value,
      })
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
  }
}
