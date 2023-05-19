import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tile } from '../shared/shared.interface';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit, OnDestroy {
  tiles: Tile[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getTileArr();
    console.log(this.tiles);
  }

  getTileArr(): void {
    const num: number = 8;
    const length: number = Math.pow(num, 2);

    for (let i = 0; i < length; i++) {
      const [row, col] = i.toString(num).padStart(2, '0');

      this.tiles.push({ row: +row, col: +col });
    }
  }

  ngOnDestroy(): void {}
}
