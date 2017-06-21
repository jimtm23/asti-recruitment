import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Applicant} from './applicant';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ApplicantService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Applicant[]> {
    let subject = new Subject<Applicant[]>();
    this.http.get(this.baseUrl + 'applicant')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Applicant(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Applicant> {
    return this.http.get(this.baseUrl + 'applicant/'+id)
      .map((r: Response) => new Applicant(r.json()));
  }

  save(applicant: Applicant): Observable<Applicant> {
    const requestOptions = new RequestOptions();
    if (applicant.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'applicant/' + applicant.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'applicant';
    }
    requestOptions.body = JSON.stringify(applicant);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Applicant(r.json()));
  }

  destroy(applicant: Applicant): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'applicant/' + applicant.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}