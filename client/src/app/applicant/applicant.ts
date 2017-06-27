

export class Applicant {
  id: number;

  firstName: string;
  lastName: string;
  middleName: string;
  nameExtension: string;
  email: string;
  cellphone: string;
  residentialAddress: string;
  permanentAddress: string;
  eNameOfSchool: string;
  eYearGraduated: string;
  eHonor: string;
  sNameOfSchool: string;
  sYearGraduated: string;
  sHonor: string;
  cNameOfSchool: string;
  cYearGraduated: string;
  cHonor: string;
  hobbies: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'asti.recruitment.Applicant : ' + (this.id ? this.id : '(unsaved)');
  }
}