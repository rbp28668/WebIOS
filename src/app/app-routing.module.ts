import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightViewComponent} from './flight-view/flight-view.component';
import { MapComponent} from './map/map.component';
import { ScenariosComponent} from './scenarios/scenarios.component';
import { TrafficComponent} from './traffic/traffic.component';
import { WeatherComponent} from './weather/weather.component';
import { RecordingComponent} from './recording/recording.component';
import { SlewComponent} from './slew/slew.component';
import { LogsComponent} from './logs/logs.component';
import { AircraftComponent} from './aircraft/aircraft.component';
import { SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {path: 'flight_view', component: FlightViewComponent},
  {path: 'map', component: MapComponent},
  {path: 'scenarios', component: ScenariosComponent},
  {path: 'traffic', component: TrafficComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'recording', component: RecordingComponent},
  {path: 'slew', component: SlewComponent},
  {path: 'logs', component: LogsComponent},
  {path: 'aircraft', component: AircraftComponent},
  {path: 'settings', component: SettingsComponent},
  { path: '',   redirectTo: '/scenarios',    pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
