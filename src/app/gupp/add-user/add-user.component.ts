import { ProfileService } from './../../_services/profile.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from 'src/app/_models/profile';
import { Grade } from 'src/app/_models/grade';
import { GradeService } from 'src/app/_services/grade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AalService } from 'src/app/_services/aal.service';
import { Aal } from 'src/app/_models/aal';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private gradeService: GradeService,
    private aalService: AalService,
    private formBuilder: FormBuilder
  ) {}
  profiles!: Profile[];
  grades!: Grade[];
  aals!: Aal[];
  form!: FormGroup;
  formChange = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.profileService.getAll().subscribe(
      (data) => {
        this.profiles = data;
        console.log(this.profiles);
      },
      (error) => console.log(error)
    );
    this.gradeService.getAll().subscribe(
      (data) => {
        this.grades = data;
        console.log(this.grades);
      },
      (error) => console.log(error)
    );
    this.aalService.getAll().subscribe((data) => {
      this.aals = data;
      console.log(this.aals);
    });
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['prefaio@2021', Validators.required],
      profile: [null, Validators.required],
      grade: [null, Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      tel: ['', Validators.required],
      aal: [null, Validators.required],
    });
  }

  submitForm() {}
}
