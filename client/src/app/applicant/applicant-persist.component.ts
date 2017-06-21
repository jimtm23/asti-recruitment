import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Applicant} from './applicant';
import {ApplicantService} from './applicant.service';
import {Response} from "@angular/http";


@Component({
  selector: 'applicant-persist',
  templateUrl: './applicant-persist.component.html'
})
export class ApplicantPersistComponent implements OnInit {

  applicant = new Applicant();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.applicantService.get(+params['id']).subscribe((applicant: Applicant) => {
          this.create = false;
          this.applicant = applicant;
        });
      }
    });
  }

  save() {
    this.applicantService.save(this.applicant).subscribe((applicant: Applicant) => {
      this.router.navigate(['/applicant', 'show', applicant.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
