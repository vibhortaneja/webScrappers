import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResetpwdComponent } from './resetpwd.component';
import { ResetpwdService } from './resetpwd.service'

describe('testing resetpwd component', () => {

  let comp: ResetpwdComponent;
  let fixture: ComponentFixture < ResetpwdComponent > ;
  let deresetpwd, deCharts, deSetting: DebugElement;
  let elresetpwd, elCharts, elSetting: HTMLElement;
  let deHeading: DebugElement;
  let elHeading: HTMLElement;
  let deResetpwd: DebugElement;
  let elResetpwd: HTMLElement;
  let deStock: DebugElement;
  let elStock: HTMLElement;
  
  //configuring module with testing environment
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule, ReactiveFormsModule
      ],
      declarations: [ResetpwdComponent], //declaring component to be tested
      providers: [{ provide: ResetpwdService }]
    }).compileComponents();
  })

  //creating fixtures and component instance for testing
  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpwdComponent);
    comp = fixture.componentInstance; //Nav Component instance
    deHeading = fixture.debugElement.query(By.css('.text-center'));
    elHeading = deHeading.nativeElement;
    deResetpwd = fixture.debugElement.query(By.css('button'));
    elResetpwd = deResetpwd.nativeElement;
    deStock = fixture.debugElement.query(By.css('#heading'));
    elStock = deStock.nativeElement;
  })

  //test case for checking whether funds component is created or not
  it('should create resetpwd component', () => {
    const reset = fixture.debugElement.componentInstance;
    expect(reset).toBeTruthy();
  });
  // positive test case to check text wriiten on button
  it('button should display text Reset Password', () => {
    fixture.detectChanges();
    expect(elResetpwd.textContent).toEqual('Reset Password');
  })
  // negative test case to check written on button
  it('button should not display text other than Reset Password', () => {
    fixture.detectChanges();
    expect(elResetpwd.textContent).not.toEqual('Reset Password1');
  })
  // positive test case to check the heading 'Stock Market' on carousel
  it('should display text Stock Market', () => {
    fixture.detectChanges();
    expect(elStock.textContent).toEqual('Stock Market')
  })
  // negative test case to check the heading 'Stock Market' on carousel
  it('should not display text other than Stock Market', () => {
    fixture.detectChanges();
    expect(elStock.textContent).not.toEqual('Stock');
  })
  //positive test case to check the heading 'Reset Password' on sign up page
  it('should display heading Reset Password', () => {
    fixture.detectChanges();
    expect(elHeading.textContent).toEqual('Reset Password');
  })
  //negative test case to check the heading 'Reset Password' on sign up page
  it('should not display heading other than Reset Password', () => {
    fixture.detectChanges();
    expect(elHeading.textContent).not.toEqual('Reset Password1');
  })
})
