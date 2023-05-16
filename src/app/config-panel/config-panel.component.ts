import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
})
export class ConfigPanelComponent {
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

  botName(form: FormGroup) {
    return form.get('bot_name');
  }

  get gameFormArray() {
    return <FormArray<FormGroup>>this.gameForm.get('gameFormArray');
  }

  nestedFormArray(index: number) {
    return this.gameFormArray.controls[index];
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
      bot_name: new FormControl('', [Validators.required]), //min length?
      boolean_val: new FormControl('', [Validators.required]),
      direction: new FormControl('', [Validators.required]),
    });

    const { length } = this.gameFormArray;
    if (length < 10) this.gameFormArray.push(form);
  }

  removeForm() {
    const { length } = this.gameFormArray;
    if (length > 2) this.gameFormArray.removeAt(this.gameFormArray.length - 1);
  }

  // checking bots unique name
  uniqueName() {
    let inp1: any = document.getElementById('in1');
    let inp2: any = document.getElementById('in2');

    let err: any = document.querySelector('.error');

    if (inp1.value === inp2.value && inp1.value !== '') {
      err.innerHTML = 'It has to be a uniqe name';
      inp1.style.borderColor = 'red';
      inp2.style.borderColor = 'red';
    } else {
      err.innerHTML = '';
      inp1.style.borderColor = '';
      inp2.style.borderColor = '';
    }
  }
}
