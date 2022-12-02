import { Injectable } from "@angular/core";
// Singleton injectable settings class.  Holds the main application settings.
@Injectable()
export class Settings {
  private _api_host: string;
  private _api_port: number;
  private _title: string;
  private _storage: Storage;

  constructor () {
    this._storage = localStorage;

    this._api_host = this._storage.getItem('host') || 'localhost';
    this._api_port = Number(this._storage.getItem('port')) || 18080;
    this._title = this._storage.getItem('title') || "Instructor Operating Station";


    // TODO use local storage to hold defaults.
  }

  get api_host() : string { return this._api_host;}
  set api_host(value: string){
    this._api_host = value;
    this._storage.setItem('host', value);
  }

  get api_port() : number { return this._api_port;}
  set api_port(value: number){
    this._api_port = value;
    this._storage.setItem('port',String(value));
  }

  get title() : string { return this._title;}
  set title(value: string){
    this._title = value;
    this._storage.setItem('title', value);
  }

}
