import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule } from '@angular/common/http';
import { NewFormComponent } from './components/new-form/new-form.component';
import { PartTimeComponent } from './components/forms/part-time/part-time.component';
import { PapCoverComponent } from './components/forms/pap-cover/pap-cover.component';
import { RatingComponent } from './components/forms/rating/rating.component';





@NgModule({
  declarations: [AppComponent, NewFormComponent, PartTimeComponent, PapCoverComponent, RatingComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, InputsModule, BrowserAnimationsModule, ButtonsModule, LabelModule, DateInputsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
