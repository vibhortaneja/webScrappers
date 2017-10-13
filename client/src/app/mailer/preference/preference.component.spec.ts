import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Directive, Injectable, Input  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { HttpModule } from '@angular/http';
import { DialogComponent, DialogService} from "ng2-bootstrap-modal";

import { PreferenceComponent } from './preference.component';
import {PreferenceService} from './preference.service';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;
   let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
       FormsModule,
       ReactiveFormsModule,
       AngularMultiSelectModule,
       HttpModule
      ],
      declarations: [ PreferenceComponent],
      providers: [PreferenceService,DialogService]
    })
    .compileComponents();
  }));

/*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;

  });

/*Testcase to check whether component is created or not*/
  it('should be created', () => {
    const preference = fixture.debugElement.componentInstance;
    expect(preference).toBeTruthy();
  });
});
