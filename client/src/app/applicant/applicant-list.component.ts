import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApplicantService} from './applicant.service';
import {Applicant} from './applicant';

@Component({
  selector: 'applicant-list',
  templateUrl: './applicant-list.component.html'
})
export class ApplicantListComponent implements OnInit {

  applicantList: Applicant[] = [];
  applicant = new Applicant();

  constructor(private applicantService: ApplicantService, private router: Router) { }

  ngOnInit() {
    this.applicantService.list().subscribe((applicantList: Applicant[]) => {
      this.applicantList = applicantList;
    });
  }
  destroy() {
    if (confirm("Are you sure?")) {
      this.applicantService.destroy(this.applicant).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/applicant','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }
}
