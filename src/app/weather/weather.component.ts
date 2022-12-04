//import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { P3dcmdService } from '../p3dcmd.service';

class Theme {
  public name: string;
  public title: string;
  public description: string;
  constructor(name: string, title: string, description: string){
    this.name = name;
    this.title = title;
    this.description = description;
  }
}



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  themes: Array<Theme> = [];
  globalMetar: String = "";
  stations : Array<string> = [];

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
    this.loadThemes();
    this.loadGlobalMetar();
    let s = this.stations; // for closure below
    this.fetchStations( function(station : any) : void {
      console.log(station);
      s.push(station.icao);
    });

  }

  private logFailure(data: any): void {
    console.log("Failed: " + data.reason + data.code);
  }


  getThemes(): Array<Theme> {
    return this.themes;
  }

  getStations() : Array<string> {
    return this.stations;
  }

  private loadThemes(): void {
    this.p3dcmd.weatherThemes().subscribe( (data:any) => {
      if (data.status === "OK") {
        for (let t of data.themes) {
          let theme: Theme = new Theme(t.name, t.title, t.description);
          this.themes.push(theme);
        }

      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching weather themes");
      console.log(err);
    });

  }

  private loadGlobalMetar(display?: HTMLElement): void {
    this.p3dcmd.weatherRequestGlobal().subscribe( (data:any) => {
      if (data.status === "OK") {
        this.globalMetar = data.metar;
        if (display) {
          display.innerHTML = data.metar;
        }
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error getting global metar");
      console.log(err);
    });

  }

  refresh(display: HTMLElement): void {
    this.p3dcmd.weatherRefresh().subscribe( (data:any) => {
      if (data.status === "OK") {
        this.loadGlobalMetar(display);
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error refreshing weather");
      console.log(err);
    });

  }


  setTheme(name: String): void {
    this.p3dcmd.weatherSetTheme(name).subscribe((data:any) => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting weather theme");
      console.log(err);
    });
  }

  themeSelected(selected: string, text:HTMLTextAreaElement): void {
    for (let t of this.themes) {
      if (t.name === selected) {
        text.value = t.description;
      }
    }
  }


  useGlobal(): void {
    this.p3dcmd.weatherUseGlobal().subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global weather");
      console.log(err);
    });

  }

  getGlobalMetar(): String {
    return this.globalMetar;
  }

  setGlobalWind(windspeed: string, direction: string, gusts: string, turbulence: String, windshear: String): void {
    this.p3dcmd.weatherSetGlobalSurfaceWind(
      parseFloat(windspeed),
      parseFloat(direction),
      parseFloat(gusts), 350,
      turbulence,
      windshear
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global wind");
      console.log(err);
    });

  }

  setGlobalVisibility(visibility: string): void {
    this.p3dcmd.weatherSetGlobalVisibility(parseFloat(visibility)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global visibility");
      console.log(err);
    });
  }

  setGlobalRVR(runway: string, rvr: string): void {
    this.p3dcmd.weatherSetGlobalRVR(runway, parseFloat(rvr)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global RVR");
      console.log(err);
    });
  }

  setGlobalPresentConditions(intensity: string, vicinity: string, descriptor: string, phenomena: string): void {
    this.p3dcmd.weatherSetGlobalPresentConditions(
      intensity, (vicinity === "on"), descriptor, phenomena
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global present conditions");
      console.log(err);
    });
  }

  setGlobalPartialObscuration(partialobs: string): void {
    this.p3dcmd.weatherSetGlobalPartialObscuration(
      partialobs
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global partial obscuration");
      console.log(err);
    });
  }

  setGlobalSkyConditions(eights: string, cloudtype: string, cloudheight: string): void {
    var cloudcover: string = parseInt(eights).toFixed() + cloudtype;

    this.p3dcmd.weatherSetGlobalSkyConditions(
      parseFloat(cloudheight) / 100,
      cloudcover
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global sky conditions");
      console.log(err);
    });
  }

  setGlobalTemperature(temp: string, dewpoint: string): void {
    this.p3dcmd.weatherSetGlobalTemperature(
      parseFloat(temp),
      parseFloat(dewpoint)
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global temperature");
      console.log(err);
    });
  }

  setGlobalQNH(qnh: string): void {
    this.p3dcmd.weatherSetGlobalQNH(parseFloat(qnh)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting global QNH");
      console.log(err);
    });
  }

  useCustom(): void {
    this.p3dcmd.weatherUseCustom().subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom weather");
      console.log(err);
    });

  }

  // Update a select element with the list of custom stations.
  private updateStations(stationList: HTMLSelectElement): void {
    this.fetchStations( function(s : any) : void {
      stationList.add(new Option(s.icao, s.icao, false, false));
    });
  }

  // Gets custom stations and passes them to a handler function.
  private fetchStations(handle : (station : Object) => void ): void {
    this.p3dcmd.weatherStations().subscribe(data => {
      if (data.status === "OK") {
        for (let s of data.stations) {
          handle(s);
        }
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error updating weather stations");
      console.log(err);
    });
  }

  addCustom(station: string, stationList: HTMLSelectElement): void {
    this.p3dcmd.weatherAddStation(station).subscribe(data => {
      if (data.status === "OK") {
        this.refreshStations(stationList);
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error adding weather station");
      console.log(err);
    });

  }

  addCustomHere(station: string, friendlyName: string, stationList: HTMLSelectElement): void {
    this.p3dcmd.weatherAddStationHere(station, friendlyName).subscribe(data => {
      if (data.status === "OK") {
        this.refreshStations(stationList);
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error adding weather station here");
      console.log(err);
    });

  }

  refreshStations(stationList?: HTMLSelectElement): void {
    this.p3dcmd.weatherRefresh().subscribe(data => {
      if (data.status === "OK") {
        if(stationList){
          this.updateStations(stationList);
        }
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error refreshing weather stations");
      console.log(err);
    });

  }

  setCustomWind(station: string, windspeed: string, direction: string, gusts: string, turbulence: String, windshear: String): void {
    this.p3dcmd.weatherSetSurfaceWind(
      station,
      parseFloat(windspeed),
      parseFloat(direction),
      parseFloat(gusts), 350,
      turbulence,
      windshear,
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom wind");
      console.log(err);
    });

  }

  setCustomVisibility(station: string, visibility: string): void {
    this.p3dcmd.weatherSetVisibility(station, parseFloat(visibility)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom visibility");
      console.log(err);
    });
  }

  setCustomRVR(station: string, runway: string, rvr: string): void {
    this.p3dcmd.weatherSetRVR(station, runway, parseFloat(rvr)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom RVR");
      console.log(err);
    });
  }

  setCustomPresentConditions(station: string, intensity: string, vicinity: string, descriptor: string, phenomena: string): void {
    this.p3dcmd.weatherSetPresentConditions(
      station, intensity, (vicinity === "on"), descriptor, phenomena
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom present conditions");
      console.log(err);
    });
  }

  setCustomPartialObscuration(station: string, partialobs: string): void {
    this.p3dcmd.weatherSetPartialObsucration(station, partialobs).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom partial obscuration");
      console.log(err);
    });
  }

  setCustomSkyConditions(station: string, eights: string, cloudtype: string, cloudheight: string, transition: string): void {
    let cloudcover = parseInt(eights).toFixed() + cloudtype;
 
    this.p3dcmd.weatherSetSkyConditions(
      station,
      parseFloat(cloudheight) / 100,
      cloudcover,
      parseFloat(transition)
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom sky conditions");
      console.log(err);
    });
  }

  setCustomTemperature(station: string, temp: string, dewpoint: string): void {
    this.p3dcmd.weatherSetTemperature(
      station,
      parseFloat(temp),
      parseFloat(dewpoint),
    ).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom temperature");
      console.log(err);
    });
  }

  setCustomQNH(station: string, qnh: string): void {
    this.p3dcmd.weatherSetQNH(station, parseFloat(qnh)).subscribe(data => {
      if (data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error setting custom QNH");
      console.log(err);
    });
  }

  selectTab(evt:MouseEvent, tabName: string) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all active elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent_active");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].className = "tabcontent";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    let element = document.getElementById(tabName);
    if(element != null) element.className += "_active";
    let target = evt.currentTarget  as HTMLButtonElement;
    if(target != null) target.className += " active";
  }

}
