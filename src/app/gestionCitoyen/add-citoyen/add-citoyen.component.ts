import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Profession } from 'src/app/_models/profession';
import { CitoyenService } from 'src/app/_services/citoyen.service';
import { ProfessionService } from 'src/app/_services/profession.service';

@Component({
  selector: 'app-add-citoyen',
  templateUrl: './add-citoyen.component.html',
  styleUrls: ['./add-citoyen.component.css'],
})
export class AddCitoyenComponent implements OnInit {
  form!: FormGroup;
  professions: Profession[] = [];
  situations: string[] = ['Marié(e)', 'Divorcé(e)', 'Célibataire'];
  constructor(
    private professionService: ProfessionService,
    private formBuilder: FormBuilder,
    private citoyenService: CitoyenService,
    private message: NzMessageService
  ) {
    professionService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.professions = data;
      },
      (error) => console.log(error)
    );

    this.form = this.formBuilder.group({
      cin: ['', Validators.required],
      prenomFr: ['', Validators.required],
      nomFr: ['', Validators.required],
      nomAr: ['', Validators.required],
      prenomAr: ['', Validators.required],
      nomPereFr: ['', Validators.required],
      nomMereFr: ['', Validators.required],
      nomPereAr: ['', Validators.required],
      nomMereAr: ['', Validators.required],
      dateNaissance: [null, Validators.required],
      lieuNaissance: ['', Validators.required],
      profession: [null, Validators.required],
      situationFamiliale: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  create() {
    this.citoyenService
      .create({
        cin: this.form.get('cin')?.value,
        dateNaissance: this.form.get('dateNaissance')?.value,
        lieuNaissance: this.form.get('lieuNaissance')?.value,
        nomMereAr: this.form.get('nomMereAr')?.value,
        nomMereFr: this.form.get('nomMereFr')?.value,
        nomPereAr: this.form.get('nomPereAr')?.value,
        nomPereFr: this.form.get('nomPereFr')?.value,
        situationFamiliale: this.form.get('situationFamiliale')?.value,
        nomAr: this.form.get('nomAr')?.value,
        prenomAr: this.form.get('prenomAr')?.value,
        nomFr: this.form.get('nomFr')?.value,
        prenomFr: this.form.get('prenomFr')?.value,
        profession: this.form.get('profession')?.value,
      })
      .subscribe(
        (data) => {
          this.message.success('Ajouter avec succès');
          this.form.reset();
        },
        (error) => console.log(error)
      );
  }
}
