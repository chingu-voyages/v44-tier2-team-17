import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Direction, Pos } from '../shared/shared.interface';
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
  bots!: NodeListOf<HTMLElement>;

  constructor(
    private sharedService: SharedService,
    private elRef: ElementRef<HTMLElement>,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.gameForm = this.sharedService.gameForm;
    this.genTileArr();
    this.genPosArr();
    this.shuffle();

    this.sharedService.startGame$.subscribe({
      next: (sub) => {
        if (sub) this.startGame();
      },
    });
  }

  startGame() {
    this.bots = this.elRef.nativeElement.querySelectorAll('app-bot');

    this.bots.forEach((bot, idx) => {
      this.setNewPos(bot, idx);
    });
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

  genPosArr(): void {
    const num: number = 8;
    const length: number = Math.pow(num, 2);

    for (let i = 0; i < length; i++) {
      const [col, row] = i.toString(num).padStart(2, '0');

      this.pos[i] = { row: +row, col: +col };
    }
  }

  getDirection(): Direction {
    const direction: Direction[] = ['N', 'W', 'E', 'S', 'NW', 'NE', 'SW', 'SE'];

    return direction[Math.floor(Math.random() * direction.length)];
  }

  setNewPos(bot: HTMLElement, index: number) {
    const form = this.nestedFormArray(index);
    const direction: Direction = form.value.direction;
    const size: number = (100 / 8) * 0.8;
    console.log(direction);

    switch (direction) {
      case 'N':
        this.render.setStyle(bot, 'top', `${0}%`);
        break;

      case 'W':
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'E':
        this.render.setStyle(bot, 'left', `${100 - size}%`);
        break;

      case 'S':
        this.render.setStyle(bot, 'top', `${100 - size}%`);
        break;

      case 'NW':
        this.render.setStyle(bot, 'top', `${0}%`);
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'NE':
        this.render.setStyle(bot, 'top', `${0}%`);
        this.render.setStyle(bot, 'left', `${100 - size}%`);
        break;

      case 'SW':
        this.render.setStyle(bot, 'top', `${100 - size}%`);
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'SE':
        this.render.setStyle(bot, 'top', `${0}%`);
        this.render.setStyle(bot, 'left', `${100 - size}%`);
        break;
    }
  }

  calcPos(i: number, coord: 'row' | 'col'): string {
    return `${(100 / 8) * (this.pos[i][coord] + 0.5) - (100 / 8) * 0.4}%`;
  }

  shuffle() {
    for (let i = this.pos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * this.pos.length);
      let temp = this.pos[i];
      this.pos[i] = this.pos[j];
      this.pos[j] = temp;
    }
  }

  ngOnDestroy(): void {}
}
