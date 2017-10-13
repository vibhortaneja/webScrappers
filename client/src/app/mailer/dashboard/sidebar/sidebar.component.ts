import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

/* SidebarComponent class */
export class SidebarComponent implements OnInit {

  constructor() {}
  config = config;
  ngOnInit() {

  }

}
