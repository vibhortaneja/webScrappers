import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterLinkWithHref, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Injectable, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { RouterLinkStubDirective } from '../../../../testing/router-stub';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { SettingsComponent } from '../settings/settings.component';
import { DashboardComponent } from '../dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NasdaqComponent } from '../nasdaq/nasdaq.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture < SidebarComponent > ;
  let location: SpyLocation;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];
  let deDashboard, deCurrency, deNasdaq, deFunds, deSetting: DebugElement;
  let elDashboard, elCurrency, elNasdaq, elFunds, elSetting: HTMLElement;

  //async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule,
          Ng2Charts,
          ReactiveFormsModule
        ],
        declarations: [SidebarComponent, NasdaqComponent, DashboardComponent, SettingsComponent, NavbarComponent, RouterLinkStubDirective]
      })
      .compileComponents();
  }));

  //sync beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    deDashboard = fixture.debugElement.query(By.css('.dashboard'));
    elDashboard = deDashboard.nativeElement;

    deCurrency = fixture.debugElement.query(By.css('.currency'));
    elCurrency = deCurrency.nativeElement;

    deNasdaq = fixture.debugElement.query(By.css('.nasdaq'));
    elNasdaq = deNasdaq.nativeElement;

    deFunds = fixture.debugElement.query(By.css('.funds'));
    elFunds = deFunds.nativeElement;

    deSetting = fixture.debugElement.query(By.css('.settings'));
    elSetting = deSetting.nativeElement;

    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    console.log(links);
  });

  it('should create Sidebar Component', () => {
    const sidebar = fixture.debugElement.componentInstance;
    expect(sidebar).toBeTruthy();
  })

  //test case for checking interpolation of DASHBOARD
  it('should display original category value through interpolation of DASHBOARD', () => {
    fixture.detectChanges();
    expect(elDashboard.textContent).toContain(component.config.sidebar.DASHBOARD);
  });

  //test case for checking interpolation of CURRENCY
  it('should display original category value through interpolation of CURRENCY', () => {
    fixture.detectChanges();
    expect(elCurrency.textContent).toContain(component.config.sidebar.CURRENCY);
  });

  //test case for checking interpolation of NASDAQ
  it('should display original category value through interpolation of NASDAQ', () => {
    fixture.detectChanges();
    expect(elNasdaq.textContent).toContain(component.config.sidebar.NASDAQ);
  });

  //test case for checking interpolation of FUNDS
  it('should display original category value through interpolation of FUNDS', () => {
    fixture.detectChanges();
    expect(elFunds.textContent).toContain(component.config.sidebar.FUNDS);
  });

  //test case for checking interpolation of SETTING
  it('should display original  value through interpolation of SETTING', () => {
    fixture.detectChanges();
    expect(elSetting.textContent).toContain(component.config.sidebar.SETTINGS);
  });


  //test case for router link 
  it('it can get router links from template', () => {
    expect(links.length).toBe(5, 'should have 3 links');
  })

});
