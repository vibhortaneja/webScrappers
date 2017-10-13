import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement} from '@angular/core';
import { HttpModule } from '@angular/http';

import { MailerComponent } from './mailer.component';
import {LoginComponent} from './login/login.component';


//mailer component test suite
describe('MailerComponent', () => {
 let component: MailerComponent;
  let fixture: ComponentFixture<MailerComponent>;

  //configuring component with testing environment
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [MailerComponent,LoginComponent],
    }).compileComponents();
  }));


//creating fixture and componentInstance
beforeEach(() => {
    fixture = TestBed.createComponent(MailerComponent);
    component = fixture.componentInstance;
  });

//checking component creation
  it('should be create mailer component', () => {
    const mailer = fixture.debugElement.componentInstance;
    expect(mailer).toBeTruthy();
  });
});
