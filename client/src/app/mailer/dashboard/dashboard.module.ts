import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

import { NasdaqComponent } from './nasdaq/nasdaq.component';
import { CurrencyComponent } from './currency/currency.component';
import { FundsComponent} from './funds/funds.component';
import {DashboardComponent} from './dashboard.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { AuthoriseGuard} from '../../guards/authorise.guard';

//routes used in this component
const route:Routes=([  {
   path:'settings',
   component:SettingsComponent,
   canActivate: [AuthoriseGuard]
 },
  {
   path:'nasdaq',
   component:NasdaqComponent,
   canActivate: [AuthoriseGuard]
 },
  {
   path:'currency',
   component:CurrencyComponent,
   canActivate: [AuthoriseGuard]
 },
  {
   path:'funds',
   component:FundsComponent,
   canActivate: [AuthoriseGuard]
 },
 {
   path:'charts',
   component:ChartComponent
 },
 {
   path:'updatePassword',
   component:UpdatepasswordComponent
 }
 ])

//all the modules and declaration
@NgModule({
 imports: [
   CommonModule,
   RouterModule,
   Ng2Charts,
   FormsModule,
   ReactiveFormsModule,
    RouterModule.forRoot(route)
 ],
 declarations: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent,
   ChartComponent,
   NasdaqComponent,
   CurrencyComponent,
   FundsComponent,
   UpdatepasswordComponent,
 ],
 providers:[AuthoriseGuard],
 exports: [
  SettingsComponent,
   NavbarComponent,
   SidebarComponent,
   NasdaqComponent,
   CurrencyComponent,
   ChartComponent,
   FundsComponent
 ]
})

export class DashboardModule { }