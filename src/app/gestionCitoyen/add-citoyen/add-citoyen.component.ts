import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-citoyen',
  templateUrl: './add-citoyen.component.html',
  styleUrls: ['./add-citoyen.component.css'],
})
export class AddCitoyenComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() formChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit(): void {}
}
