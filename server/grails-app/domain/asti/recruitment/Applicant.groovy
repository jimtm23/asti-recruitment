package asti.recruitment


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Applicant {
    String firstName
    String lastName
    String middleName
    String nameExtension
    String email
    String cellphone
    String residentialAddress
    String permanentAddress
}