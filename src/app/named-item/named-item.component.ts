import { Component, OnInit } from '@angular/core';
import { NamedItem} from '../named-item';

@Component({
  selector: 'app-named-item',
  templateUrl: './named-item.component.html',
  styleUrls: ['./named-item.component.css']
})
export class NamedItemComponent implements OnInit {
  private model = new NamedItem("","","");

  constructor() { }

  ngOnInit() {
  }

  filename() : String { return this.model.filename;}
  title() : String { return this.model.title;}
  description() : String { return this.model.description;}

}
