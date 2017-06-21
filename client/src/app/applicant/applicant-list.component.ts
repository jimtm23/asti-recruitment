import {Component, OnInit} from '@angular/core';
import {ApplicantService} from './applicant.service';
import {Applicant} from './applicant';

@Component({
  selector: 'applicant-list',
  templateUrl: './applicant-list.component.html'
})
export class ApplicantListComponent implements OnInit {

  applicantList: Applicant[] = [];

  constructor(private applicantService: ApplicantService) { }

  ngOnInit() {
    this.applicantService.list().subscribe((applicantList: Applicant[]) => {
      this.applicantList = applicantList;
    });
  }
}
