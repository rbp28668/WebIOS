// Core injectable service to access P3D REST API.
// Uses settings object to get host and port.
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, range } from 'rxjs';
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
  runCommand(cmd: any) : Observable<any> {
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
  thermalDrop(radius : number, height : number, rate : number)  : Observable<any> {
     var url = this.baseUrl() + "thermal/drop";
    var ch = "?";
    if(radius) {
      url += ch + "radius=" + radius;
      ch = "&";
    }
    if(height) {
      url += ch + "height=" + height;
      ch = "&";
    }
    if(rate) {
      url += ch + "rate=" + rate;
      ch = "&";
    }
    return this.http.get(url);
  }

  //////////////////////////////////////////////////////////////
  // RECORD

  recordStart() : Observable<any> {
    var url = this.baseUrl() + "record/record";
    return this.http.get(url);
  }

  recordPlay(title : String): Observable<any> {
    var url = this.baseUrl() + "record/play";
    url += "?title=" + URLEncode(title);
    return this.http.get(url);
  }

  recordStop(title : String, description : String): Observable<any> {
    var url = this.baseUrl() + "record/stop";
    url += "?title=" + URLEncode(title);
    if(description) {
      url += "&" + URLEncode(description);
    }
    return this.http.get(url);
  }

  recordList() : Observable<any> {
    var url = this.baseUrl() + "record/list";
    return this.http.get(url);
  }

  recordAnalyse() : Observable<any> {
    var url = this.baseUrl() + "record/analyse";
    return this.http.get(url);
  }

  
  //////////////////////////////////////////////////////////////
  // Failures

  // Note, setting/clearing failures not directly implemented as
  // easy to set/clear directly from a button with mode=true or mode=false
  failuresCurrent() : Observable<any> {
    var url = this.baseUrl() + "failures/current";
    return this.http.get(url);
  }

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

  igcStartRecording(interval : number, p1 : String, p2 : String, glider_type : String, registration : String, comp_class : String, comp_id : String ) : Observable<any> {
    var url = this.baseUrl() + "igc/start";
    url += "?" + "igc=" + interval;
    if(p1)  url += "&" + "p1" + URLEncode(p1);
    if(p2)  url += "&" + "p1" + URLEncode(p2);
    if(glider_type)  url += "&" + "p1" + URLEncode(glider_type);
    if(registration)  url += "&" + "p1" + URLEncode(registration);
    if(comp_class)  url += "&" + "p1" + URLEncode(comp_class);
    if(comp_id)  url += "&" + "p1" + URLEncode(comp_id);
    return this.http.get(url);
  }

  igcStopRecording() : Observable<any> {
    var url = this.baseUrl() + "igc/stop";
    return this.http.get(url);
  }

  //////////////////////////////////////////////////////////////
  // Weather

  weatherThemes() : Observable<any> {
    var url = this.baseUrl() + "weather/themes";
    return this.http.get(url);
  }

  weatherSetTheme(name : String) : Observable<any> {
    var url = this.baseUrl() + "weather/theme";
    url += "?name=" + URLEncode(name);
    return this.http.get(url);
  }

  weatherUseGlobal() : Observable<any> {
    var url = this.baseUrl() + "weather/global";
    return this.http.get(url);
  }

  weatherUseCustom() : Observable<any> {
    var url = this.baseUrl() + "weather/custom";
    return this.http.get(url);
  }

  weatherRequest(station : String) : Observable<any> {
    var url = this.baseUrl() + "weather/request";
    url = url + "?name=" + URLEncode(station);
    return this.http.get(url);
  }

  weatherRequestGlobal() : Observable<any> {
    var url = this.baseUrl() + "weather/request_global";
    return this.http.get(url);
  }

  weatherRefresh() : Observable<any> {
    var url = this.baseUrl() + "weather/refresh";
    return this.http.get(url);
  }

  weatherAddStation(station : String) : Observable<any> {
    var url = this.baseUrl() + "weather/add";
    url = url + "?icao=" + URLEncode(station);
    return this.http.get(url);
  }

  weatherAddStationHere(station : String, name : String) : Observable<any> {
    var url = this.baseUrl() + "weather/add_here";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }
    if(name) {
      url = url + ch + "name=" + URLEncode(name);
    }
    return this.http.get(url);
  }

  weatherStations() : Observable<any> {
    var url = this.baseUrl() + "weather/stations";
    return this.http.get(url);
  }

  private encodeWind(extension : String, kts : number, direction : number, gusts : number, depth : number, turbulence : String, windshear: String) : String{
    
    var speed = "000" + (kts.toFixed());
    speed = speed.substring(speed.length - 3);

    var dirn = "000" + direction.toFixed();
    dirn = dirn.substring(dirn.length - 3);

    var wind = dirn + speed;

    if(gusts){
      var g = "00" + gusts.toFixed();
      g = g.substring(g.length - 2);
      wind = wind + "G" + g;
    }

    wind = wind + "KT";
    
    var extend = (depth) || (turbulence) || (windshear);
    if(extend) {
      if(!depth){
        depth = 350;
      }
      if(!turbulence){
        turbulence = "N";
      }
      if(!windshear){
        windshear = "G"; // gradual
      }

      var d = "0000" + depth.toFixed();
      d = d.substring(d.length - 4);

      wind = wind + "&" + extension + d + turbulence + windshear;
    }
    
    return wind; 
  }

  weatherSetSurfaceWind(station : String, kts : number, direction : number, gusts : number, depth : number, turbulence : String, windshear: String) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var wind = this.encodeWind("D", kts, direction, gusts, depth, turbulence, windshear);
    
    url = url + ch + "surface_wind=" + URLEncode(wind);
    ch = '&';

    return this.http.get(url);
  }

  weatherSetWindsAloft(station : String, kts : number, direction : number, gusts : number, depth : number, turbulence : String, windshear: String) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var wind = this.encodeWind("A", kts, direction, gusts, depth, turbulence, windshear);
    
    url = url + ch + "winds_aloft=" + URLEncode(wind);
    ch = '&';

    return this.http.get(url);
  }

  weatherSetCAVOK(station : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }
        
    url = url + ch + "cavok=CAVOK";
    return this.http.get(url);
  }

  weatherSetVisibility(station : String, visibility : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }
    
    var vis = "";
    if(visibility < 0.25) {
      vis = "M1/4SM";
    } else if (visibility < 1) {
      var eigths = (visibility * 8).toFixed();
      vis = eigths + "/8SM" 
    } else {
      vis = visibility.toFixed() + "SM";
    }
    url = url + ch + "visibility=" + vis;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetRVR(station : String, runway : String, rvr : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var r = "0000" + rvr.toFixed();
    r = r.substring(r.length - 4);
    var range = "R" + runway + "/" + r + "FT";
    url = url + ch + "rvr=" + range;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetPresentConditions(station : String, intensity : String, vicinity : boolean, descriptor : String, phenomena : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var conditions = "";
    if(intensity == "light"){
      conditions = conditions + "-";
    } else if (intensity == "severe"){
      conditions = conditions + "+";
    }
    
    if(vicinity) {
      conditions = conditions + "VC"
    }

    conditions = conditions + descriptor + phenomena;

    url = url + ch + "present_conditions=" + conditions;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetPartialObsucration(station : String, partialObsucration : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var view = null;
    if(partialObsucration == "few"){
      view = "FEW000";
    } else if (partialObsucration == "scattered"){
      view = "SCT000";
    } else if (partialObsucration == "broken"){
      view = "BKN000";
    } else {
      console.log(`Unknown obscuration: ${partialObsucration}`);
    }

    url = url + ch + "partial_obscuration=" + view;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetSkyConditions(station : String, height : number, amount : String, seconds : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }
    
    var h : String = "000";

    if(height){
      if(height >= 100000) {
        h = "999";
      } else {
        h = "000" + (height / 100).toFixed();
        h = h.substring(h.length - 3);
      }
    }

    url = url + ch + amount + h;
    ch = '&';
    
    if(seconds){
      url = url + ch + "seconds=" + seconds;
    }
    return this.http.get(url);
  }

  weatherSetTemperature(station : String, temperature : number, dewpoint : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    url = url + ch + temperature.toFixed() + "/" + dewpoint.toFixed();
    ch = '&';

    return this.http.get(url);
  }

  weatherSetQNH(station : String, qnh : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update";
    var ch = '?'
    if(station) {
      url = url + ch + "icao=" + URLEncode(station);
      ch = '&';
    }

    var mb = "0000" + qnh.toFixed();
    mb = mb.substring(mb.length - 4);

    mb = "Q" + mb
    
    url = url + ch + "altimiter=" + URLEncode(mb);
    return this.http.get(url);

  }

  weatherSetMetar( metar : String, seconds : number) : Observable<any> {
    var url = this.baseUrl() + "weather/set_metar";
    url = url + "?metar=" + URLEncode(metar);
    if(seconds){
      url = url + "&seconds=" + seconds;
    }
    return this.http.get(url);
  }

  weatherSetGlobalSurfaceWind(kts : number, direction : number, gusts : number, depth : number, turbulence : String, windshear: String) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
 
    var wind = this.encodeWind("D", kts, direction, gusts, depth, turbulence, windshear);
    
    url = url + ch + "surface_wind=" + URLEncode(wind);
    ch = '&';
  
   return this.http.get(url);
  }

  weatherSetGlobalWindsAloft(kts : number, direction : number, gusts : number, depth : number, turbulence : String, windshear: String) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'

    var wind = this.encodeWind("A", kts, direction, gusts, depth, turbulence, windshear);
    
    url = url + ch + "winds_aloft=" + URLEncode(wind);
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalCAVOK() : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
        
    url = url + ch + "cavok=CAVOK";
    return this.http.get(url);
  }

  weatherSetGlobalVisibility(visibility : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
    
    var vis = "";
    if(visibility < 0.25) {
      vis = "M1/4SM";
    } else if (visibility < 1) {
      var eigths = (visibility * 8).toFixed();
      vis = eigths + "/8SM" 
    } else {
      vis = visibility.toFixed() + "SM";
    }
    url = url + ch + "visibility=" + vis;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalRVR(runway : String, rvr : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
    
    var r = "0000" + rvr.toFixed();
    r = r.substring(r.length - 4);
    var range = "R" + runway + "/" + r + "FT";
    url = url + ch + "rvr=" + range;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalPresentConditions(intensity : String, vicinity : boolean, descriptor : String, phenomena : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'

    var conditions = "";
    if(intensity == "light"){
      conditions = conditions + "-";
    } else if (intensity == "severe"){
      conditions = conditions + "+";
    }
    
    if(vicinity) {
      conditions = conditions + "VC"
    }

    conditions = conditions + descriptor + phenomena;

    url = url + ch + "present_conditions=" + conditions;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalPartialObscuration(partialObscuration : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'

    var view = null;
    if(partialObscuration == "few"){
      view = "FEW000";
    } else if (partialObscuration == "scattered"){
      view = "SCT000";
    } else if (partialObscuration == "broken"){
      view = "BKN000";
    } else {
      console.log(`Unknown obscuration: ${partialObscuration}`);
    }

    url = url + ch + "partial_obscuration=" + view;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalSkyConditions(height : number, amount : String) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
   
    var h : String = "000";

    if(height){
      if(height >= 100000) {
        h = "999";
      } else {
        h = "000" + (height / 100).toFixed();
        h = h.substring(h.length - 3);
      }
    }

    url = url + ch + amount + h;
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalTemperature(temperature : number, dewpoint : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'

    url = url + ch + temperature.toFixed() + "/" + dewpoint.toFixed();
    ch = '&';

    return this.http.get(url);
  }

  weatherSetGlobalQNH( qnh : number) : Observable<any> {
    var url = this.baseUrl() + "weather/update_global";
    var ch = '?'
 
    var mb = "0000" + qnh.toFixed();
    mb = mb.substring(mb.length - 4);

    mb = "Q" + mb
    
    url = url + ch + "altimiter=" + URLEncode(mb);
    return this.http.get(url);

  }


  weatherSetGlobalMetar( metar : String, seconds : number) : Observable<any> {
    var url = this.baseUrl() + "weather/set_global_metar";
    url = url + "?metar=" + URLEncode(metar);
    if(seconds){
      url = url + "&seconds=" + seconds;
    }
    return this.http.get(url);
  }


  

  //////////////////////////////////////////////////////////////
  // Log

  logOn( name : String, membershipNumber : number) : Observable<any> {
    var url = this.baseUrl() + "log/logon";
    url = url + "?name=" + URLEncode(name);
    url = url + "&number=" + membershipNumber;
    return this.http.get(url);
  }

  logOff( ) : Observable<any> {
    var url = this.baseUrl() + "log/logoff";
   return this.http.get(url);
  }

  private logMessage( type : String, msg : String) : Observable<any> {
    var url = this.baseUrl() + "log/" + type;
    url = url + "?message=" + URLEncode(msg);
    return this.http.get(url);
  }

  logInfo(message : String) : Observable<any> {
     return this.logMessage("info", message);
  }
  logWarning(message : String) : Observable<any> {
    return this.logMessage("warn", message);
  }
  logError(message : String) : Observable<any> {
    return this.logMessage("error", message);
  }

//////////////////////////////////////////////////////////////
  // Panel


  //////////////////////////////////////////////////////////////
  // Support routines

  private baseUrl() : string {
    var url =  "http://" + this.settings.api_host + ":" + this.settings.api_port + "/p3dapi/";
    //console.log("Using: " + url);
    return url;
  }
}
