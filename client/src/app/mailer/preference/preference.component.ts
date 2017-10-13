import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {config} from '../../config/config'

import {PreferenceService} from './preference.service';

export interface ConfirmModel {
	title:string;
	message:string;
}

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel,OnInit {
	title: string;
	message: string;
  user: any={};  
  radioBut: any=[];
	pref: any=[];
	items:string[];
	config=config;
	registeredData: any;
	email:string;
	basicExampleSelectedItems = [];
	placeholderExampleList = [];
	placeholderExampleSelectedItems = [];
	placeholderExampleSettings = {};

	

	constructor(private preference: PreferenceService,dialogService: DialogService){
		 super(dialogService);
	}
	ngOnInit(){

		//getting frequency from radio button
		this.user = {
				freqency: this.frequency[0].value,
				role: null
		}
		
		//getting investment product type from multi checklist
		this.basicExampleSelectedItems = [
													{"id":1,"itemName":"Funds"},
													{"id":2,"itemName":"Nasdaq Stocks"},
													{"id":3,"itemName":"Currency"}],
	 
	 //getting investment product based on search
		this.placeholderExampleList = [
													{"id":1,"itemName":"Funds"},
													{"id":2,"itemName":"Nasdaq Stocks"},
													{"id":3,"itemName":"Currency"}
												];
		
		//getting default value as funds untill user does not set prefrences
		this.placeholderExampleSelectedItems = [
													{"id":1,"itemName":"Funds"}];

   //display variousnoptions to selct preferences to user 
		this.placeholderExampleSettings = { 
															text:"Select preferences",
															selectAllText:'Select All',
															unSelectAllText:'UnSelect All',
															enableSearchFilter: true,
															classes:"myclass custom-class",
															searchPlaceholderText: "Custom Placeholder text"
														};

 
	}

	//getting frquency from radio button
	public frequency = [
		{ value: 'D', display: 'Daily' },
		{ value: 'W', display: 'Weekly' },
		{value: 'M', display: 'Monthly'}
];

  //method for select at least single  investment product
	onItemSelect(item:string[]){
		this.items=item;
	}

	//method for deselect all from placeholder investment product
	OnItemDeSelect(item:string[]){
		this.items=item;
	}

	//method for select all investment product
	onSelectAll(items: string[]){
    this.items=items;
	}

	//method for deselect all investment product
	 onDeSelectAll(items: string[]){
	 	this.items=items;
	}

	//method for frequency true or false
confirm() {
		this.result = true;
		this.close();
	}

	//method for save all preferences into database which are selected by user
	public save(preferenceSetting: string, isValid:any) {
      let preferences={
			items:this.items,
			frequency: preferenceSetting
      }
      this.registeredData=JSON.parse(localStorage.getItem('currentUser'));
       this.email=this.registeredData.email;
				this.preference.insert(preferences,this.email).subscribe((data)=>{
				})
		}
}
