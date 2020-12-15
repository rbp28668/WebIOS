import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { NavButtonComponent } from './navbutton/navbutton.component';
import { FlightViewComponent } from './flight-view/flight-view.component';
import { MapComponent } from './map/map.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WeatherComponent } from './weather/weather.component';
import { RecordingComponent } from './recording/recording.component';
import { SlewComponent } from './slew/slew.component';
import { LogsComponent } from './logs/logs.component';
import { CmdbuttonComponent } from './cmdbutton/cmdbutton.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { SettingsComponent } from './settings/settings.component';
import { NamedItemComponent } from './named-item/named-item.component';
// Global settings
import { Settings} from './settings';
import { TargetComponent } from './target/target.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavPanelComponent,
    NavButtonComponent,
    FlightViewComponent,
    MapComponent,
    ScenariosComponent,
    TrafficComponent,
    WeatherComponent,
    RecordingComponent,
    SlewComponent,
    LogsComponent,
    CmdbuttonComponent,
    AircraftComponent,
    SettingsComponent,
    NamedItemComponent,
    TargetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    Settings      // Global singleton injectable.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //public settings = new Settings("localhost");
}
