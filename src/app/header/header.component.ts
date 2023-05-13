import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  vol: boolean = true;

  volumeOnOff(): void {
    this.vol = !this.vol;

    let audio = new Audio();
    audio.src = '../assets/volume.wav';
    audio.load();
    audio.play();
  }
}
