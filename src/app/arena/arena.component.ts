import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Pos } from '../shared/shared.interface';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit, OnDestroy {
  tiles: number[] = [];
  pos: Pos[] = [];
  gameForm!: FormGroup;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.gameForm = this.sharedService.gameForm;
    this.genTileArr();
    this.genPosArr();
    this.shuffle();
  }

  get gameFormArray() {
    return <FormArray<FormGroup>>this.gameForm.get('gameFormArray');
  }

  nestedFormArray(index: number) {
    return this.gameFormArray.controls[index];
  }

  genTileArr(): void {
    for (let i = 0; i < 8 * 8; i++) this.tiles.push(i);
  }

  getRandomPos() {}

  genPosArr(): void {
    const num: number = 8;
    const length: number = Math.pow(num, 2);

    for (let i = 0; i < length; i++) {
      const [col, row] = i.toString(num).padStart(2, '0');

      this.pos[i] = { row: +row, col: +col };
    }
  }

  calcPos(i: number, coord: 'row' | 'col'): string {
    return `calc(((100% / 8) * ${this.pos[i][coord] + 0.5}) - 1.5rem)`;
  }

  shuffle() {
    for (let i = this.pos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * this.pos.length);
      let temp = this.pos[i];
      this.pos[i] = this.pos[j];
      this.pos[j] = temp;
    }
  }

  // getTileArr(): void {
  //   const num: number = 8;
  //   const length: number = Math.pow(num, 2);

  //   for (let i = 0; i < length; i++) {
  //     const [row, col] = i.toString(num).padStart(2, '0');

  //     this.tiles.push({ row: +row, col: +col });
  //   }
  // }

  ngOnDestroy(): void {}
}
