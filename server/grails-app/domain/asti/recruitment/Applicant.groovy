package asti.recruitment


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Applicant {
    /** Name */
    String firstName
    String lastName
    String middleName
    String nameExtension
    /** Contact Information */
    String email
    String cellphone
    String residentialAddress
    String permanentAddress
    /** Elementary Education */
    String eNameOfSchool
    String eYearGraduated
    String eHonor
    /** Secondary Education*/
    String sNameOfSchool
    String sYearGraduated
    String sHonor
    /** College Education */
    String cNameOfSchool
    String cYearGraduated
    String cHonor
    /** Other */
    String hobbies

    static constraints = {
        firstName nullable: false, minSize: 4, maxSize: 25//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        lastName nullable:false, minSize: 4, maxSize: 25//, matches: /^[a-zA-Z0-9\w Ññ]+\$/
        middleName nullable:true, minSize: 4, maxSize: 25//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        nameExtension nullable:true, maxSize: 5//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        email nullable:true//, matches: /^[a-zA-Z0-9._Ññ]+@[a-z]+([.][a-z]+)+\$/
        cellphone nullable:true//, matches: /^[0-9;)(-]+\$/
        residentialAddress nullable: false, minSize: 4, maxSize: 100//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
        permanentAddress nullable: false, minSize: 4, maxSize: 100//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
        eNameOfSchool nullable: false, minSize: 4, maxSize: 50//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
        eYearGraduated nullable:false//, matches: /^[0-9;)(-]+\$/
        eHonor nullable: true//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        sNameOfSchool nullable: false, minSize: 4, maxSize: 50//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
        sYearGraduated nullable: false//, matches: /^[0-9;)(-]+\$/
        sHonor nullable:true//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        cNameOfSchool nullable:false, minSize: 4, maxSize: 50//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
        cYearGraduated nullable: false//, matches: /^[0-9;)(-]+\$/
        cHonor nullable: true//, matches: /[a-zA-Z0-9\w Ññ]+\$/
        hobbies nullable: true//, matches: /^[ÑñA-Za-z0-9 -~]*\$/
    }
}