import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  arrow_up = true;
  arrow_down = false;
  dropdown_menu = true;

  constructor() { }

  ngOnInit() {
  }

  arrow_hover(){
    this.arrow_up = false;
    this.arrow_down = true;
    this.dropdown_menu = false;
  }
  arrow_hoverout(){
  this.arrow_up = true;
  this.arrow_down = false;
  this.dropdown_menu = true;
  }

}
