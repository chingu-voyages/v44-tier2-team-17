import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  startGame$ = new Subject<boolean>();
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
}
