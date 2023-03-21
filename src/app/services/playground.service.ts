import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { ROUNDS_AMOUNT } from '../app.module';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  started = false;

  circleData$ = new BehaviorSubject({
    showCircle: false,
    top: '',
    left: '',
    size: '',
  });

  currentRound$ = new BehaviorSubject(0);
  totalRounds: number;

  score: { [key: number]: { signalShowed: number; spaceUnclicked: number; sevenClicked: number } } = {};
  private _roundInProgress = false;
  private _firstSpaceClicked = true;

  constructor(
    @Inject(ROUNDS_AMOUNT) totalRounds: number,
    private readonly _router: Router,
  ) {
    this.totalRounds = totalRounds;
  }

  spaceClick(): void {
    if (this._firstSpaceClicked) {
      this.started = true;
      this._firstSpaceClicked = false;
    }

    if (this._roundInProgress) return;

    this._startTimer();
  }

  spaceUnClicked(): void {
    this.score[this.currentRound$.value].spaceUnclicked = new Date().getTime();
  }

  sevenClick(): void {
    this._roundInProgress = false;
    this.circleData$.next({
      showCircle: false,
      left: '',
      top: '',
      size: ''
    });
    this.score[this.currentRound$.value].sevenClicked = new Date().getTime();

    if (this.currentRound$.value === this.totalRounds) {
      this.started = false;
      this._router.navigate(['results']);
      return;
    }

  }

  private _startTimer(): void {
    this._roundInProgress = true;
    const randomTime = Math.floor(Math.random() * 5000) + 1000;

    timer(randomTime).subscribe(() => {
      const top = Math.floor(Math.random() * 90) + '%';
      const left = Math.floor(Math.random() * 90) + '%';
      const size = Math.floor(Math.random() * 100 + 100) + 'px';

      this.circleData$.next({
        showCircle: true,
        top,
        left,
        size
      });
      this.currentRound$.next(this.currentRound$.value + 1);
      this.score[this.currentRound$.value] = {
        sevenClicked: 0,
        signalShowed: 0,
        spaceUnclicked: 0,
      }
      this.score[this.currentRound$.value].signalShowed = new Date().getTime();
    })
  }
}
