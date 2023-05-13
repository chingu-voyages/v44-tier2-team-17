import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voyage';

  play: boolean = true;

  battleBtn(): void {
    this.play = !this.play;

    let audio = new Audio();
    audio.src = '../assets/battle-btn.wav';
    audio.load();
    audio.play();

    // (color change)


    // let btn: any = document.querySelector('.action-btn');

    // if (this.play) {
    //   btn.style.backgroundColor = '#88d988';
    // } else {
    //   btn.style.backgroundColor = 'rgb(255 0 0 / 79%)';
    // }
  }
}
