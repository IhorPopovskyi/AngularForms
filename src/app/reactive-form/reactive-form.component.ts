import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from './../custom.validators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.passwordCustomValidator(/[0-9]/, { hasNumbers: true }),
        CustomValidators.passwordCustomValidator(/[a-zA-z]/, {
          hasLetters: true,
        }),
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}'),
        CustomValidators.emailCustomValidator,
      ]),
      emails: new FormArray([]),
    });
  }

  get emailFormArray() {
    return this.reactiveForm.get('emails') as FormArray;
  }

  submit() {
    const formData = { ...this.reactiveForm.value };
    this.reactiveForm.reset();
  }

  addEmail() {
    this.emailFormArray.push(new FormControl(null, Validators.required));
  }

  removeEmails(index: number) {
    this.emailFormArray.removeAt(index);
  }
}
