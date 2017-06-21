import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ApplicantListComponent} from './applicant-list.component';
import {ApplicantPersistComponent} from './applicant-persist.component';
import {ApplicantShowComponent} from './applicant-show.component';

const routes: Routes = [
  {path: 'applicant', redirectTo: 'applicant/list', pathMatch: 'full'},
  {path: 'applicant/list', component: ApplicantListComponent},
  {path: 'applicant/create', component: ApplicantPersistComponent},
  {path: 'applicant/edit/:id', component: ApplicantPersistComponent},
  {path: 'applicant/show/:id', component: ApplicantShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingModule {}