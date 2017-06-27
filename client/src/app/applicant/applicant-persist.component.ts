import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Applicant} from './applicant';
import {ApplicantService} from './applicant.service';
import {Response} from "@angular/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'applicant-persist',
  templateUrl: './applicant-persist.component.html',
  styleUrls: ['./applicant-persist.component.css']
})
export class ApplicantPersistComponent implements OnInit {

  userForm : FormGroup;

  applicant = new Applicant();
  create = true;
  errors: any[];
  

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private applicantService: ApplicantService, private router: Router) {}

  ngOnInit() {
    
    this.userForm = this._formBuilder.group({
      name: this._formBuilder.group({
        lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]],
        firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]],
        middleName: [null, [Validators.minLength(4), Validators.maxLength(25), Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]],
        nameExtension: [null, [Validators.maxLength(5), Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]]
      }),
      contactInformation: this._formBuilder.group({
        email: [null, Validators.pattern('^[a-zA-Z0-9._Ññ]+@[a-z]+([.][a-z]+)+\$')],
        cellphone: [null, Validators.pattern('^[0-9;)(-]+\$')],
        residentialAddress: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]],
        permanentAddress: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]]
      }),
      elementaryEducation: this._formBuilder.group({
        eNameOfSchool: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]],
        eYearGraduated: ['',[Validators.required, Validators.pattern('^[0-9;)(-]+\$')]],
        eHonor: ['', Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]
      }),
      secondaryEducation: this._formBuilder.group({
        sNameOfSchool:['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]],
        sYearGraduated: ['', [Validators.required, Validators.pattern('^[0-9;)(-]+\$')]],
        sHonor: ['', Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]
      }),
      collegeEducation: this._formBuilder.group({
        cNameOfSchool: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]],
        cYearGraduated: ['', [Validators.required, Validators.pattern('^[0-9;)(-]+\$')]],
        cHonor: ['', Validators.pattern('[a-zA-Z0-9\w Ññ]+\$')]
      }),
      hobbies: ['', Validators.pattern('^[ÑñA-Za-z0-9 -~]*\$')]  
    })

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
