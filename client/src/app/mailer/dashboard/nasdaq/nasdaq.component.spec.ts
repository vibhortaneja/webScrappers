import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { DebugElement, ChangeDetectorRef }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import{ChartsModule as Ng2Charts} from 'ng2-charts';

import { NasdaqComponent } from './nasdaq.component';
import {NavbarComponent} from '../navbar/navbar.component';
import { SidebarComponent} from '../sidebar/sidebar.component';
import { DashboardService} from '../dashboard.service';
import { NasdaqService } from '../service/nasdaq.service';
import {TweetService} from '../service/tweet.service';

describe('NasdaqComponent', () => {
  let component: NasdaqComponent;
  let fixture: ComponentFixture<NasdaqComponent>;
  let spy : jasmine.Spy;
  let de:      DebugElement;
  let el:      HTMLElement;
  let destock: DebugElement;
  let elstock: HTMLElement;

  //configuring module with testing environment
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      Ng2Charts,
      RouterTestingModule,
      HttpModule
      ],
      declarations: [ NasdaqComponent,NavbarComponent,SidebarComponent],
      providers:[DashboardService,NasdaqService,TweetService]
    })
    .compileComponents();
  }));

  //creating fixtures and component instance for testing
  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //test case for checking whether nasdaq component is created or not
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
