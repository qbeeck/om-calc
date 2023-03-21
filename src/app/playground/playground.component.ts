import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { PlaygroundService } from '../services/playground.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  constructor(
    readonly settings: SettingsService,
    readonly playground: PlaygroundService,
  ) {}

  @HostListener('window:keydown.space')
  handleSpace() {
    this.playground.spaceClick();
  }

  @HostListener('window:keydown.7')
  handleSevent() {
    this.playground.sevenClick();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode !== 32) return;

    this.playground.spaceUnClicked();
  }

  // От появления сигнала до отрыва клавиши пробела - латентный
  // От появления сигнала до нажатия клавиши 7 - общий
  // От момента открыва руки от пробела до нажатия клавиши 7 - моторный

  // Появление сигнала
  // Нажатие клавишы 7
  // Момент отрыва руки от пробела
}
