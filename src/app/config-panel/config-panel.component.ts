import { Component } from '@angular/core';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss']
})
export class ConfigPanelComponent {

  vol: boolean = true;

  volumeOnOff(): void {
    this.vol = !this.vol;
  }

}
