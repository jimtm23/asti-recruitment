import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Applicant} from './applicant';
import {ApplicantService} from './applicant.service';

@Component({
  selector: 'applicant-persist',
  templateUrl: './applicant-show.component.html'
})
export class ApplicantShowComponent implements OnInit {

  applicant = new Applicant();

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.applicantService.get(+params['id']).subscribe((applicant: Applicant) => {
        this.applicant = applicant;
      });
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
