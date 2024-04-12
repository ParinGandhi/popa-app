import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartTimeComponent } from './components/forms/part-time/part-time.component';
import { PapCoverComponent } from './components/forms/pap-cover/pap-cover.component';
import { RatingComponent } from '@progress/kendo-angular-inputs';

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
    path: 'rating',
    component: RatingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
