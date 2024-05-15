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
import { NewRatingComponent } from './components/forms/new-rating/new-rating.component';
import { ActionButtonsComponent } from './components/common/action-buttons/action-buttons.component';
import { GenericFormTemplateComponent } from './components/forms/generic-form-template/generic-form-template.component';
// import { NavigationModule } from '@progress/kendo-angular-navigation';
// import { IconsModule } from "@progress/kendo-angular-icons";
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    NewFormComponent,
    PartTimeComponent,
    PapCoverComponent,
    RatingComponent,
    NewRatingComponent,
    ActionButtonsComponent,
    GenericFormTemplateComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    LabelModule,
    DateInputsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // NavigationModule,
    // IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
