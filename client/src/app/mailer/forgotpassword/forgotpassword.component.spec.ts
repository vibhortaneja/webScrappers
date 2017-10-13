import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotpasswordComponent } from './forgotpassword.component';
import { ForgotpasswordService } from './forgotpassword.service'

describe('Testing forgotPassword component', () => {

	let comp: ForgotpasswordComponent;
	let fixture: ComponentFixture < ForgotpasswordComponent > ;
	let deDashboard, deCharts, deSetting, deMailer: DebugElement;
	let elDashboard, elCharts, elSetting, elMailer: HTMLElement;

	//configuring module with testing environment
	beforeEach(async() => {

		TestBed.configureTestingModule({
			imports: [RouterTestingModule,
				FormsModule, ReactiveFormsModule
			],
			declarations: [ForgotpasswordComponent], //declaring component to be tested
			providers: [{ provide: ForgotpasswordService }]
		}).compileComponents();
	})

	//creating component instance and handler
	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotpasswordComponent);
		comp = fixture.componentInstance; //Nav Component instance
	})

	//test case for checking whether forgot password is created or not
	it('should create forgot password component', () => {
		const forgetPassword = fixture.debugElement.componentInstance;
		expect(forgetPassword).toBeTruthy();
	});

})
