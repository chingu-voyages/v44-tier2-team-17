import {
  AfterViewInit,
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
export class ArenaComponent implements OnInit, AfterViewInit, OnDestroy {
  tiles: number[] = [];
  pos: Pos[] = [];
  gameForm!: FormGroup;
  bots!: NodeListOf<HTMLElement>;
  speed: number = 20;

  constructor(
    private sharedService: SharedService,
    private elRef: ElementRef<HTMLElement>,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.startGame();
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

  calcSpeed(bot: HTMLElement, { x2, y2 }: { y2?: number; x2?: number }) {
    const x1: number = +bot.style['left'].replace('%', '');
    const y1: number = +bot.style['top'].replace('%', '');
    const x: number = (typeof x2 == 'number' ? x2 : x1) - x1;
    const y: number = (typeof y2 == 'number' ? y2 : y1) - y1;

    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    this.render.setStyle(
      bot,
      'transition',
      `all ${distance * this.speed}ms linear`
    );
  }

  setNewPos(bot: HTMLElement, index: number) {
    const form = this.nestedFormArray(index);
    const direction: Direction = form.value.direction;
    const size: number = (100 / 8) * 0.8;

    switch (direction) {
      case 'N':
        this.calcSpeed(bot, { y2: 0 });
        this.render.setStyle(bot, 'top', `${0}%`);
        break;

      case 'W':
        this.calcSpeed(bot, { x2: 0 });
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'E':
        this.calcSpeed(bot, { x2: 100 - size });
        this.render.setStyle(bot, 'left', `${100 - size}%`);
        break;

      case 'S':
        this.calcSpeed(bot, { y2: 100 - size });
        this.render.setStyle(bot, 'top', `${100 - size}%`);
        break;

      case 'NW':
        this.calcSpeed(bot, { y2: 0, x2: 0 });
        this.render.setStyle(bot, 'top', `${0}%`);
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'NE':
        this.calcSpeed(bot, { y2: 0, x2: 100 - size });
        this.render.setStyle(bot, 'top', `${0}%`);
        this.render.setStyle(bot, 'left', `${100 - size}%`);
        break;

      case 'SW':
        this.calcSpeed(bot, { y2: 100 - size, x2: 0 });
        this.render.setStyle(bot, 'top', `${100 - size}%`);
        this.render.setStyle(bot, 'left', `${0}%`);
        break;

      case 'SE':
        this.calcSpeed(bot, { y2: 100 - size, x2: 100 - size });
        this.render.setStyle(bot, 'top', `${100 - size}%`);
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

    // ensure that all bots are one cell apart
  }

  ngOnDestroy(): void {}
}
