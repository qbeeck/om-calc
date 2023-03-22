import { Component, Inject, OnInit } from '@angular/core';
import { ROUNDS_AMOUNT } from '../app.module';
import { PlaygroundService } from '../services/playground.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  latency: number[] = [];
  motor: number[] = [];
  general: number[] = [];

  latencyAverage = 0;
  motorAverage = 0;
  generalAverage = 0;

  constructor(
    @Inject(ROUNDS_AMOUNT) public totalRounds: number,
    readonly settings: SettingsService,
    readonly playground: PlaygroundService
  ) {
    const objects = Object.values(this.playground.score);

    objects.forEach((obj) => {
      this.latency.push(obj.spaceUnclicked - obj.signalShowed);
      this.motor.push(obj.sevenClicked - obj.spaceUnclicked);
      this.general.push(obj.sevenClicked - obj.signalShowed);
    });

    this.latencyAverage =
      this.latency.reduce((acc, num) => acc + num, 0) / this.latency.length;
    this.motorAverage =
      this.motor.reduce((acc, num) => acc + num, 0) / this.motor.length;
    this.generalAverage =
      this.general.reduce((acc, num) => acc + num, 0) / this.general.length;
  }
}
