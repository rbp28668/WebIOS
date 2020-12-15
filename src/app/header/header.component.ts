import { Component, OnInit } from '@angular/core';
import { Settings} from '../settings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private settings: Settings) { }

  ngOnInit() {
  }

  get title() : string {
    return this.settings.title;
  }
}
