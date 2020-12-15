// Core injectable service to access P3D REST API.
// Uses settings object to get host and port.
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from './settings'

// TODO - find proper function for this.
function URLEncode(value : String) : String {
  return value;
}

@Injectable({
  providedIn: 'root'
})
export class P3dcmdService {

  constructor(private http: HttpClient, private settings: Settings) { }

  // Runs a command, returns true on success.
  runCommand(cmd) : Observable<any> {
      return this.http.get(this.baseUrl() + cmd);
  }

  //////////////////////////////////////////////////////////////
  // SCENARIOS
  scenariosList(filter : String) : Observable<any> {
    var url = this.baseUrl() + "scenario/list";
    if(filter) {
      url = url + "?filter=" + filter;
    }
    return this.http.get(url);
  }
  scenariosLoad(file : String) : Observable<any> {
    var url = this.baseUrl() + "scenario/load?file="+URLEncode(file);
    return this.http.get(url);
  }
  scenariosSave(file:String, title:String, description:String) : Observable<any> {
    var url = this.baseUrl() + "scenario/save";
    url = url + "?file=" + URLEncode(file);
    if(title) {
      url = url + "&" + URLEncode(title);
    }
    if(description) {
      url = url + "&" + URLEncode(description);
    }
    return this.http.get(url);
  }

  //////////////////////////////////////////////////////////////
  // POSITION

  positionCurrent() : Observable<any> {
    var url = this.baseUrl() + "position/current";
    return this.http.get(url);
  }

  positionAvailable() : Observable<any> {
    var url = this.baseUrl() + "position/available";
    return this.http.get(url);
  }

  positionBack(count : number) : Observable<any> {
    var url = this.baseUrl() + "position/back";
    if(count) {
      url += "?count="+count;
    }
    return this.http.get(url);
  }

  positionSet(count : number) : Observable<any> {
    var url = this.baseUrl() + "position/set";
    if(count) {
      url += "?count="+count;
    }
    return this.http.get(url);
  }

  positionList(filter : String) : Observable<any> {
    var url = this.baseUrl() + "position/list";
    if(filter) {
      url += "?filter"+filter;
    }
    return this.http.get(url);
  }

  positionLoad(file : String) : Observable<any> {
    var url = this.baseUrl() + "position/load?file="+URLEncode(file);
    return this.http.get(url);
  }

  positionSave(file:String, title:String, description:String) : Observable<any> {
    var url = this.baseUrl() + "position/save";
    url = url + "?file=" + URLEncode(file);
    if(title) {
      url = url + "&" + URLEncode(title);
    }
    if(description) {
      url = url + "&" + URLEncode(description);
    }
    return this.http.get(url);
  }

  positionUp(feet : number) : Observable<any> {
    var url = this.baseUrl() + "position/up";
    if(feet) {
      url += "?feet"+feet;
    }
    return this.http.get(url);
  }

  positionDown(feet : number) : Observable<any> {
    var url = this.baseUrl() + "position/down";
    if(feet) {
      url += "?feet"+feet;
    }
    return this.http.get(url);
  }

  //////////////////////////////////////////////////////////////
  // THERMAL

  //////////////////////////////////////////////////////////////
  // RECORD

  //////////////////////////////////////////////////////////////
  // TRAFFIC

  trafficLaunch(
    range: number,
    speedKts: number,
    bearing: number,
    name: String,
    tail_number: String,
    relative_height: number
  ): Observable<any> {
    var url = this.baseUrl() + "traffic/launch";
    var ch = "?";
    if(range) {
      url += ch + "range=" + range;
      ch = "&";
    }
    if(speedKts){
      url += ch + "speed=" + speedKts;
      ch = "&"
    }
    if(bearing){
      url += ch + "bearing=" + bearing;
      ch = "&"
    }
    if(name){
      url += ch + "name=" + URLEncode(name);
      ch = "&"
    }
    if(tail_number){
      url += ch + "tail_number=" + URLEncode(tail_number);
      ch = "&"
    }
    if(relative_height){
      url += ch + "relative_height=" + relative_height;
    }

    return this.http.get(url);

  }

  trafficAircraft() : Observable<any> {
    var url = this.baseUrl() + "traffic/aircraft";
    return this.http.get(url);
  }



  //////////////////////////////////////////////////////////////
  // IGC
  igcList(filter: String) : Observable<any> {
    var url = this.baseUrl() + "igc/list";
    if(filter){
      url += "?" + "filter=" + URLEncode(filter);
    }
    return this.http.get(url);
  }

  igcReplay(igc: String) : Observable<any> {
    var url = this.baseUrl() + "igc/replay";
    url += "?" + "igc=" + URLEncode(igc);
    return this.http.get(url);
  }

  igcTraffic(igc: String, type: String, restart: boolean) : Observable<any> {
    var url = this.baseUrl() + "igc/traffic";
    url += "?" + "igc=" + URLEncode(igc);
    url += "&" + "type=" + URLEncode(type);
    if(restart){
      url += "&" + "restart=" + restart;
    }
    return this.http.get(url);
  }

  igcClear() : Observable<any> {
    var url = this.baseUrl() + "igc/clear";
    return this.http.get(url);
  }


  //////////////////////////////////////////////////////////////
  // Support routines

  private baseUrl() : string {
    var url =  "http://" + this.settings.api_host + ":" + this.settings.api_port + "/p3dapi/";
    //console.log("Using: " + url);
    return url;
  }
}
