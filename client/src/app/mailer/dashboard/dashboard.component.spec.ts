import { async, ComponentFixture, TestBed ,fakeAsync,tick} from '@angular/core/testing';
import { DebugElement, ChangeDetectorRef }    from '@angular/core';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { By }          from '@angular/platform-browser';
import { Router,RouterLinkWithHref, RouterState,ActivatedRoute, Event } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent} from './sidebar/sidebar.component';
import { NasdaqService } from './service/nasdaq.service';
import { DashboardService} from './dashboard.service';
import {NavbarComponent} from './navbar/navbar.component';
import {CurrencyService} from './service/currency.service';
import {TweetService} from './service/tweet.service';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
/*Router stub class*/
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('DashboardComponent', () => {

 let spy : jasmine.Spy;
 let component: DashboardComponent;
 let fixture: ComponentFixture<DashboardComponent>;
 let de:      DebugElement;
 let el:      HTMLElement;
 let destock: DebugElement;
 let elstock: HTMLElement;

 let mockData = ["value of Nasdaq is 360","value of sensex  is 450"];
/*configuring module with testing environment*/
 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [FormsModule,HttpModule],
     declarations: [DashboardComponent, SidebarComponent,NavbarComponent, RouterLinkStubDirective ],
     providers: [NasdaqService,CurrencyService,TweetService,{provide: DashboardService},{provide: Router}],


     
     
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(DashboardComponent);
   component = fixture.componentInstance;
    
    destock = fixture.debugElement.query(By.css('.logout'));
    elstock = destock.nativeElement;
    de = fixture.debugElement.query(By.css('a'));
    el = de.nativeElement;
    


 });
/*checking creation of dashboard component*/
it('should create dashboard component',()=>{
 expect(component).toBeTruthy();
});
/*checking display of title*/
it('should display read more title', () => {

 fixture.detectChanges()
  expect(el.textContent).toContain(component.config.dashboard.PERSONALISED_MAILER);

});

/*checking logout method*/
it('should display logout', () => {

fixture.detectChanges()
  expect(elstock.textContent).toContain(component.config.dashboard.LOGOUT);

});

});