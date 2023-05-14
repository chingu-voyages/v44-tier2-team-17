import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss']
})
export class ConfigPanelComponent {

  // form validation

  startGameForm: FormGroup = new FormGroup({
    bot_name1: new FormControl("", [Validators.required]), //min length?
    bot_name2: new FormControl("", [Validators.required]),
    boolean_val1: new FormControl("", [Validators.required]),
    boolean_val2: new FormControl("", [Validators.required]),
    boolean_op1: new FormControl("", [Validators.required]),
    boolean_op2: new FormControl("", [Validators.required]),
    direction1: new FormControl("", [Validators.required]),
    direction2: new FormControl("", [Validators.required])
  })

  get botName1() { return this.startGameForm.get('bot_name1'); }
  get botName2() { return this.startGameForm.get('bot_name2'); }

  clearForm() {
    this.startGameForm.reset({
      boolean_val1: '', boolean_val2: '', boolean_op1: '', boolean_op2: '', direction1: '', direction2: ''
    });
    this.uniqueName();


    let audio = new Audio();
    audio.src = '../assets/clear.wav';
    audio.load();
    audio.play();
  }


  // checking bots unique name

  uniqueName() {

    let inp1: any = document.getElementById("in1");
    let inp2: any = document.getElementById("in2");

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
