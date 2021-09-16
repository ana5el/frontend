import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-personneles',
  templateUrl: './info-personneles.component.html',
  styleUrls: ['./info-personneles.component.css'],
})
export class InfoPersonnelesComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() formChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit(): void {}
}
