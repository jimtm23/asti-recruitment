

export class Applicant {
  id: number;

  middleName: string;
  nameExtension: string;
  lastName: string;
  email: string;
  cellphone: string;
  firstName: string;
  permanentAddress: string;
  residentialAddress: string;

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