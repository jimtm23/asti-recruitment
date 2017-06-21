import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ApplicantService} from './applicant.service';


import {ApplicantRoutingModule} from './applicant-routing.module';
import {ApplicantShowComponent} from './applicant-show.component';
import {ApplicantListComponent} from './applicant-list.component';
import {ApplicantPersistComponent} from './applicant-persist.component';

@NgModule({
  declarations: [
    ApplicantListComponent,
    ApplicantPersistComponent,
    ApplicantShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicantRoutingModule
  ],
  providers: [
    ApplicantService
  ]
})
export class ApplicantModule {}