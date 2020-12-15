import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'nav-button',
  templateUrl: './navbutton.component.html',
  styleUrls: ['./navbutton.component.css']
})
export class NavButtonComponent implements OnInit {

  @Input() caption : string;
  @Input() route : string;
  selected = false;

  doRoute() {
    //console.log("Route to " + this.route);
    this.router.navigate([this.route]);
  }

  //see https://angular.io/guide/router

  constructor(private router: Router) {
    //this.caption = "Routing button"
  }

  ngOnInit() {
  }

}
