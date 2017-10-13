import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement} from '@angular/core';
import { HttpModule } from '@angular/http';

import { FundsComponent } from './funds.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {CurrencyService} from '../service/currency.service';
import {DashboardService} from '../dashboard.service';
import {TweetService} from '../service/tweet.service';
import {FundService} from '../service/fund.service';
 
describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;

  //configuring module with testing environment
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [ FundsComponent,NavbarComponent,SidebarComponent ],
      providers: [CurrencyService,DashboardService,TweetService,FundService]
    })
    .compileComponents();
  }));

  //creating fixtures and component instance for testing
  beforeEach(() => {
    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
  });

  //test case for checking whether funds component is created or not
  it('should be create funds component', () => {
    const funds = fixture.debugElement.componentInstance;
    expect(funds).toBeTruthy();
  });
});
