import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';

export const ROUNDS_AMOUNT = new InjectionToken('ROunds');

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PlaygroundComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: ROUNDS_AMOUNT, useValue: 50 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
