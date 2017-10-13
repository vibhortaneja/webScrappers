import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';
import { DashboardService } from '../dashboard.service'

describe('testing navbar component', () => {

	let comp: NavbarComponent;
	let fixture: ComponentFixture < NavbarComponent > ;
	let  deLogout, deMailer: DebugElement;
	let  elLogout, elMailer: HTMLElement;
  //async beforeEach
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [NavbarComponent], //declaring component to be tested
      providers: [{ provide: DashboardService }]
    }).compileComponents();
  })

	//sync beforeEach
	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		comp = fixture.componentInstance; //Nav Component instance
		//For interpolation of SETTINGS
		deLogout = fixture.debugElement.query(By.css('.logout'));
		elLogout = deLogout.nativeElement;
		//For interpolation of MAILER
		deMailer = fixture.debugElement.query(By.css('.mailer'));
		elMailer = deMailer.nativeElement;
	})

  //test case for checking whether navbar is created or not
  it('should create navbar component', () => {
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  });


	//test case for checking interpolation of LOGOUT
	it('should display original category value through interpolation of LOGOUT', () => {
		fixture.detectChanges();
		expect(elLogout.textContent).toContain(comp.config.dashboard.LOGOUT);
	});


  //test case for checking interpolation of MAILER
  it('should display original category value through interpolation of MAILER', () => {
    fixture.detectChanges();
    expect(elMailer.textContent).toContain(comp.config.dashboard.PERSONALISED_MAILER);
  });

})
