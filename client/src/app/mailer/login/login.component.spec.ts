import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { LoginService } from './login.service';
import { RouterLinkStubDirective } from '../../../testing/router-stub';

describe('testing login component', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];
  let deStock: DebugElement;
  let elStock: HTMLElement;

  //async beforeEach
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule, HttpModule
      ],
      declarations: [LoginComponent, SignUpComponent, ForgotpasswordComponent, RouterLinkStubDirective], //declaring component to be tested
      providers: [{ provide: LoginService }]
    }).compileComponents();
  })

  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance; //Login Component instance
    deStock = fixture.debugElement.query(By.css('p'));
    elStock = deStock.nativeElement;


    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    console.log(links);

  })

  /*Testcase to check whether service is injected or not*/
  it('should create Login component', () => {
    const login = fixture.debugElement.componentInstance;
    expect(login).toBeTruthy();
  });

  /*Testcase to check whether label is currently displayed or not*/
  it('should display carousel heading through interpolation', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toContain(comp.config.login.PICTURE_DESCRIPTION_1);
  });


})
