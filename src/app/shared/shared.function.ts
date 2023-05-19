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
    const forbidden = formArray.controls.every(
      (form, idx) => form.get('bot_name')?.value == control.value
    );

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
};
