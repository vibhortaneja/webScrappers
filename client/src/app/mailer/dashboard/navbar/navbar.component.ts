import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service'
import { Router } from '@angular/router'

import { config } from '../../../config/config'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

 /*navbarcomponent class*/
 
export class NavbarComponent implements OnInit {


  constructor(private DashboardService: DashboardService, private router: Router) {}


  config = config;

  ngOnInit() {}

  // method for logout
  logout() {
    this.DashboardService.signout()
      .subscribe((res) => {
        localStorage.clear()
        this.router.navigateByUrl('logout')
      }, error => {
        console.log("Error" + error)
      })
  }

}
