import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  // Edit the singleton settings instance using DI.
  constructor(private model : Settings) { }

  ngOnInit() {
  }

  public getModel() : Settings {
    return this.model;
  }
}
