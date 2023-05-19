import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './../shared/shared.function';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
})
export class ConfigPanelComponent implements OnInit {
  gameForm = new FormGroup({
    gameFormArray: new FormArray([
      new FormGroup({
        bot_name: new FormControl('', [Validators.required]), //min length?
        boolean_val: new FormControl('', [Validators.required]),
        direction: new FormControl('', [Validators.required]),
      }),
      new FormGroup({
        bot_name: new FormControl('', [Validators.required]), //min length?
        boolean_val: new FormControl('', [Validators.required]),
        direction: new FormControl('', [Validators.required]),
      }),
    ]),
    boolean_op: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    this.setValidator();
  }

  get gameFormArray() {
    return <FormArray<FormGroup>>this.gameForm.get('gameFormArray');
  }

  nestedFormArray(index: number) {
    return this.gameFormArray.controls[index];
  }

  botName(form: FormGroup) {
    return form.get('bot_name');
  }

  booleanVal(form: FormGroup) {
    return form.get('boolean_val');
  }

  direction(form: FormGroup) {
    return form.get('direction');
  }

  setValidator() {
    this.gameFormArray.controls.forEach((form) => {
      this.botName(form)?.addValidators(
        forbiddenNameValidator(this.gameFormArray)
      );
    });
  }

  clearForm(form: FormGroup) {
    form.reset();
    // this.uniqueName();
    let audio = new Audio();
    audio.src = '../assets/clear.wav';
    audio.load();
    audio.play();
  }

  clearAllForm() {
    this.gameForm.reset();
  }

  addForm() {
    const form: FormGroup = new FormGroup({
      bot_name: new FormControl('', [
        Validators.required,
        forbiddenNameValidator(this.gameFormArray),
      ]),
      boolean_val: new FormControl('', [Validators.required]),
      direction: new FormControl('', [Validators.required]),
    });

    const { length } = this.gameFormArray;
    if (length < 10) {
      this.gameFormArray.push(form);
    }
  }

  removeForm() {
    const { length } = this.gameFormArray;
    if (length > 2) this.gameFormArray.removeAt(this.gameFormArray.length - 1);
  }
}
