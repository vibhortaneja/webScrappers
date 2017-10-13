import { config } from '../../../config/config';
import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router'
import {NasdaqService} from '../service/nasdaq.service';
import {TweetService} from '../service/tweet.service';

@Component({
	selector: 'app-nasdaq',
	templateUrl: './nasdaq.component.html',
	styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {




constructor(private DashboardService: DashboardService, private router: Router,private nasdaq:NasdaqService,private tweetService:TweetService) { }
list:string;
nasdaqcode:number;
config=config;
value:{};
stockprice:string;
stocknews:string;
header:string;
date:any;
stockrate:any=[];
investmentProductuser:string;
listchart:string;
close:any;

//call when component loads
//contains the code and company for nasdaq 
  ngOnInit() {
     this.nasdaq.getnasdaqstocks().subscribe((data) => {
		 this.nasdaqcode = data;
	 }, error => {
		 console.log("Error" + error)
	 })
	}


//Nasdaq news search according to the Code selected in dropdown
 search(name:string) {

	 this.value = {
		 term: name
	 }
	 this.searchnews(name);
	 this.nasdaq.getresult(this.value).subscribe(res => {
		 this.stockprice = res.data;
	 }, error => {
		 console.log("Error" + error)
	 })

 }

//nasdaq stock price according to the code
 searchnews(name:string){

	 this.twitnasdaq();
   this.chart(name);
   this.header='NEWS'
	 this.nasdaq.getnews(name).subscribe(res => {
	 this.stocknews = res;
	 }, error => {
		 console.log("Error" + error)
	 })
 }

 //twitter data of nasdaq
  twitnasdaq(){
    
    let user='nasdaq';
    this.tweetService.tweetSearch(user).subscribe((data)=>{
          this.investmentProductuser=data;
        })
  }

 //logout function
 logout() {
	 this.DashboardService.signout()
		 .subscribe((res) => {

			 this.router.navigateByUrl('')
		 }, error => {
			 console.log("Error" + error)
		 })
 }

//chart on the basis of code selected in dropdown only for 2016 data
chart(name:string) {
  
   this.nasdaq.getchart(name).subscribe(res => {
   this.listchart = res.results;
   for(let i=0;i<this.listchart.length;i++){    
   this.date=new Date(res.results[i].tradingDay);
     if(this.date.getFullYear()==2016){
      this.stockrate.push(res.results[i].close)
           }
     }    
   }, error => {
     console.log("Error" + error)
   })
 }


// lineChart 
 public lineChartData= this.stockrate;
 

 public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
 public lineChartType:string = 'line';


 public randomizeType():void {
   this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
 }


 public chartClicked(e:any):void {
   console.log(e);
 }


 public chartHovered(e:any):void {
   console.log(e);
 }

}
