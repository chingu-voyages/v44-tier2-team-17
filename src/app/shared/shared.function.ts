import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const forbiddenNameValidator = (
  formArray: FormArray<FormGroup>
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let count: number = 0;
    formArray.controls.forEach((form, idx) => {
      if (form.get('bot_name')?.value === control.value) {
        count++;
      }
    });

    const forbidden = count > 1;

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
};
