import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartTimeComponent } from './components/forms/part-time/part-time.component';
import { PapCoverComponent } from './components/forms/pap-cover/pap-cover.component';
import { RatingComponent } from './components/forms/rating/rating.component';
import { NewRatingComponent } from './components/forms/new-rating/new-rating.component';
import { GenericFormTemplateComponent } from './components/forms/generic-form-template/generic-form-template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: 'part-time',
    component: PartTimeComponent,
  },
  {
    path: 'pap-cover/:id',
    component: PapCoverComponent,
  },
  {
    path: 'ratings',
    component: RatingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'new-ratings/:id',
    component: NewRatingComponent,
  },
  {
    path: 'generic-form-template/:id',
    component: GenericFormTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
