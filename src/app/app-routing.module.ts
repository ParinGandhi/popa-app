import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartTimeComponent } from './components/forms/part-time/part-time.component';
import { PapCoverComponent } from './components/forms/pap-cover/pap-cover.component';
import { RatingComponent } from './components/forms/rating/rating.component';
import { NewRatingComponent } from './components/forms/new-rating/new-rating.component';


const routes: Routes = [
  {
    path: 'part-time',
    component: PartTimeComponent,
  },
  {
    path: 'pap-cover',
    component: PapCoverComponent,
  },
  {
    path: 'ratings',
    component: RatingComponent,
  },
  {
    path: 'new-ratings',
    component: NewRatingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
