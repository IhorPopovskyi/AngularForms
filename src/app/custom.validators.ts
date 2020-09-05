import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static emailCustomValidator(control: FormControl) {
    if (
      [
        'face@gmail.com',
        'qwerty@gmail.com',
        'test@gmail.com',
        'name@gmail.com',
        'morgenshtern@gmail.com',
      ].includes(control.value)
    ) {
      return { restrictedEmail: true };
    }
    return null;
  }

  static passwordCustomValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
