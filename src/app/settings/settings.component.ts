import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  name = '';
  color = 'red';
  colors = [
    { name: 'Красный', value: 'red' },
    { name: 'Зеленый', value: 'green' },
    { name: 'Желтый', value: 'yellow' },
  ];

  constructor(
    private readonly _router: Router,
    private readonly _settings: SettingsService
  ) { }

  onSubmit() {
    this._settings.color = this.color;
    this._settings.name = this.name;
    this._router.navigate(['playground']);
  }
}
