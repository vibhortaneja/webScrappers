import { Component, OnInit } from '@angular/core';
import { NasdaqService } from '../service/nasdaq.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


//to generate charts related to nasdaq data
export class ChartComponent implements OnInit {

  constructor(private nasdaq: NasdaqService) {}
  nasdaqcode: any;
  ngOnInit() {

    this.nasdaq.getnasdaqstocks().subscribe((data) => {

      this.nasdaqcode = data;
      console.log(this.nasdaqcode)
    }, error => {
      console.log("Error" + error)
    })
  }

}
