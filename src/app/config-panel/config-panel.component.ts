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
    bot_name2: new FormControl("", [Validators.required])
  })

  get botName1() { return this.startGameForm.get('bot_name1'); }
  get botName2() { return this.startGameForm.get('bot_name2'); }


  clearForm() {
    this.startGameForm.reset();
    this.uniqueName();
  }


  // checking bots unique name

  uniqueName() {

    let inp1: any = document.getElementById("in1");
    let inp2: any = document.getElementById("in2");

    let err: any = document.querySelector('.error');

    if (inp1.value === inp2.value && inp1.value !== '') {
      err.innerHTML = 'It has to be a uniqe name';
    } else {
      err.innerHTML = '';
    }

  }


}
