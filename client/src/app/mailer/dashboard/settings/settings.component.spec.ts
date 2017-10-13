import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'
import { DashboardService } from '../dashboard.service';
import {SettingsService} from './settings.service';
import { SettingsComponent } from './settings.component';
describe('Settings component Testing', () => {

  let comp: SettingsComponent;
  let fixture: ComponentFixture < SettingsComponent > ;
  let deSettings, deUpdateName, deAlternateEmail,deUpdatePwd,deMailingPref,deDaily,deWeekly,deMonthly: DebugElement;
  let elSettings, elUpdateName, elAlternateEmail,elUpdatePwd,elMailingPref,elDaily,elWeekly,elMonthly: HTMLElement;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
      HttpModule,
        FormsModule, ReactiveFormsModule],
      declarations: [SettingsComponent, NavbarComponent], //declaring component to be tested
      providers: [SettingsService,{ provide: DashboardService }]
    }).compileComponents();
  })

/*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    comp = fixture.componentInstance;
    
  })

/*Testcase to check whether component is created or not*/
  it('should create Settings component', () => {
    const settings = fixture.debugElement.componentInstance;
    expect(settings).toBeTruthy();
  });


})