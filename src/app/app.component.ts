import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'voyage';
  play: boolean = true;
  gameForm!: FormGroup;
  audio = new Audio('../assets/battle-btn.wav');

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.gameForm = this.sharedService.gameForm;
  }

  battleBtn(): void {
    this.audio.load();
    this.audio.play();
    this.sharedService.startGame$.next(this.play);

    this.play = !this.play;

    // (color change)

    // let btn: any = document.querySelector('.action-btn');

    // if (this.play) {
    //   btn.style.backgroundColor = '#88d988';
    // } else {
    //   btn.style.backgroundColor = 'rgb(255 0 0 / 79%)';
    // }
  }
}
