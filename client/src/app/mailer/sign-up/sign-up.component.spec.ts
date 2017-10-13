import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SignUpComponent } from './sign-up.component';
import { SignUpService } from './sign-up.service';

describe('testing sign up component', () => {

  let comp: SignUpComponent;
  let fixture: ComponentFixture < SignUpComponent > ;
  let deStock: DebugElement;
  let elStock: HTMLElement;
  let deHeading: DebugElement;
  let elHeading: HTMLElement;
  let deRegister: DebugElement;
  let elRegister: HTMLElement;

  //configuring component with testing environment
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule, RouterTestingModule
      ],
      declarations: [SignUpComponent],
      providers: [{ provide: SignUpService }, { provide: Router }]
    }).compileComponents();
  })

  //creating fixtures and component instance
  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    comp = fixture.componentInstance; 

    deStock = fixture.debugElement.query(By.css('h2'));
    elStock = deStock.nativeElement;

    deHeading = fixture.debugElement.query(By.css('.text-center'));
    elHeading = deHeading.nativeElement;

    deRegister = fixture.debugElement.query(By.css('button'));
    elRegister = deRegister.nativeElement;

  })

  // test case to check if the component loads
  it('should create SignUp component', () => {
    const signUp = fixture.debugElement.componentInstance;
    expect(signUp).toBeTruthy();
  });

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

  //positive test case to check the heading 'Register' on sign up page
  it('should display heading Register', () => {
    fixture.detectChanges();
    expect(elHeading.textContent).toEqual('Register');
  })

  //negative test case to check the heading 'Register' on sign up page
  it('should not display heading other than Register', () => {
    fixture.detectChanges();
    expect(elHeading.textContent).not.toEqual('Register1');
  })

  // positive test case to check text wriiten on button
  it('button should display text Register', () => {
    fixture.detectChanges();
    expect(elRegister.textContent).toEqual('Register');
  })
  
  // negative test case to check written on button
  it('button should not display text other than Register', () => {
    fixture.detectChanges();
    expect(elRegister.textContent).not.toEqual('Register1');
  })

})
