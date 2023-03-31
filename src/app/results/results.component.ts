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
  latency: number[] = [ 541, 415, 454, 438, 459, 441, 392, 491, 483, 434, 350, 507, 417, 475, 472, 409, 512, 443, 469, 531, 404, 469, 441, 487, 455, 489, 481, 428, 516, 561, 460, 501, 447, 374, 484, 443, 476, 367, 459, 481, 538, 487, 477, 385, 337, 440, 452, 449, 465, 491 ];
  motor: number[] = [ 190, 148, 204, 204, 146, 160, 112, 190, 117, 130, 106, 181, 204, 150, 156, 149, 91, 155, 157, 140, 169, 94, 98, 166, 105, 134, 151, 145, 164, 127, 111, 147, 142, 142, 176, 167, 162, 117, 161, 106, 142, 132, 130, 147, 141, 118, 138, 171, 110, 131 ];
  general: number[] = [ 761, 649, 658, 642, 698, 601, 504, 623, 600, 564, 616, 688, 621, 605, 628, 528, 663, 598, 626, 721, 573, 563, 539, 653, 560, 643, 632, 703, 680, 688, 571, 634, 589, 476, 660, 610, 638, 754, 620, 587, 650, 619, 607, 494, 700, 558, 590, 620, 575, 622 ];

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
