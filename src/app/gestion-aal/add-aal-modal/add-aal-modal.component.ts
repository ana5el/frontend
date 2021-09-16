import { Point } from './../../_models/point';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TypeAal } from './../../_models/type-aal';
import { AalService } from './../../_services/aal.service';
import { Component, OnInit } from '@angular/core';
import { Aal } from 'src/app/_models/aal';

@Component({
  selector: 'app-add-aal-modal',
  templateUrl: './add-aal-modal.component.html',
  styleUrls: ['./add-aal-modal.component.css'],
})
export class AddAalModalComponent implements OnInit {
  pointList: Point[] = [];
  typeList!: TypeAal[];
  aalList!: Aal[];
  libellear?: string;
  form!: FormGroup;
  constructor(private aalService: AalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aalService.getAll().subscribe(
      (data) => (this.aalList = data),
      (error) => console.log(error)
    );
    this.aalService.getTypes().subscribe(
      (data) => (this.typeList = data),
      (error) => console.log(error)
    );
    this.form = this.fb.group({
      libellear: [''],
      libellefr: [''],
      tel: [''],
      type: [null],
      sup: [null],
    });
  }
  create() {}
}
