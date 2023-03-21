import { Component, Inject, OnInit } from '@angular/core';
import { ROUNDS_AMOUNT } from '../app.module';
import { PlaygroundService } from '../services/playground.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  latency: number[] =  [ 314, 364, 383, 436, 337, 389, 394, 350, 399, 403, 435, 569, 340, 350, 363, 336, 352, 463, 307, 371, 341, 382, 401, 406, 383, 334, 365, 312, 400, 393, 381, 373, 569, 286, 284, 326, 308, 318, 422, 303, 299, 361, 360, 387, 335, 364, 394, 406, 411, 305 ];
  motor: number[] =  [ 243, 203, 249, 212, 210, 299, 208, 207, 254, 239, 198, 421, 209, 177, 185, 209, 251, 240, 231, 215, 308, 271, 223, 237, 204, 247, 190, 283, 196, 233, 230, 254, 181, 250, 318, 264, 217, 203, 242, 217, 213, 246, 265, 330, 164, 248, 174, 177, 203, 282 ];
  general: number[] = [ 557, 567, 632, 648, 547, 688, 602, 557, 653, 642, 633, 990, 549, 527, 548, 545, 603, 703, 538, 586, 649, 653, 624, 643, 587, 581, 555, 595, 596, 626, 611, 627, 750, 536, 602, 590, 525, 521, 664, 520, 512, 607, 625, 717, 499, 612, 568, 583, 614, 587 ];

  latencyAverage = 0;
  motorAverage = 0;
  generalAverage = 0;

  constructor(
    @Inject(ROUNDS_AMOUNT) public totalRounds: number,
    readonly settings: SettingsService,
    readonly playground: PlaygroundService,
  ) {
    const objects = Object.values(this.playground.score);

    objects.forEach((obj) => {
      this.latency.push(obj.spaceUnclicked - obj.signalShowed);
      this.motor.push(obj.sevenClicked - obj.spaceUnclicked);
      this.general.push(obj.sevenClicked - obj.signalShowed);
    });

    this.latencyAverage = this.latency.reduce((acc, num) => acc + num, 0) / this.latency.length;
    this.motorAverage = this.motor.reduce((acc, num) => acc + num, 0) / this.motor.length;
    this.generalAverage = this.general.reduce((acc, num) => acc + num, 0) / this.general.length;
  }
}
