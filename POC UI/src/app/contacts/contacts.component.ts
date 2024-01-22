import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactsService } from '../services/contacts.service';

import { Contacts } from '../Models/Contacts';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ModalserviceService } from '../services/modalservice.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  @ViewChild('basicModal') private basicModal: ElementRef | undefined;
  @ViewChild('closeModal') private closeModal: ElementRef | any;

  formData: any = {};
  ContactList?: Observable<Contacts[]>;
  ContactList1?: Observable<Contacts[]>;
  submitted = false;
  massage = "";
  modalRef: any;
  contactForm!: FormGroup;


  constructor(private formbulider: FormBuilder,
    private contactsService: ContactsService, private router: Router,
    private jwtHelper: JwtHelperService, private toastr: ToastrService, private modalService: ModalserviceService) { }

  ngOnInit() {


    this.contactForm = this.formbulider.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [null, Validators.required, Validators.pattern('[- +()0-9]+'),
        Validators.min(1), Validators.max(6)],
    })

    this.getContactList();
  }
  getContactList() {
    this.ContactList1 = this.contactsService.getContactList();
    this.ContactList = this.ContactList1;
    // console.log(this.ContactList);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  PostContact() {

    debugger;

    var contact_Master = new Contacts();

    contact_Master.firstName = this.formData.firstName;
    contact_Master.lastName = this.formData.lastName;
    contact_Master.email = this.formData.email;
    contact_Master.phoneNumber = this.formData.phoneNumber;
    contact_Master.address = this.formData.address;
    contact_Master.city = this.formData.city;
    contact_Master.state = this.formData.state;
    contact_Master.country = this.formData.country;
    contact_Master.postalCode = this.formData.postalCode;

    if (this.formData.Id == undefined) {
      this.contactsService.postContactData(contact_Master).subscribe(
        () => {

          this.toastr.success('Data Saved Successfully');
          // this.router.navigate(['/home']);
          this.closeModal.nativeElement.click();
          debugger;
          this.formData = {}
          this.getContactList();
          this.contactForm.reset();

        }
      );
    }
    else {
      contact_Master.id = this.formData.Id;
      this.contactsService.updateContact(contact_Master).subscribe(() => {
        this.toastr.success('Data Updated Successfully');
        this.closeModal.nativeElement.click();
        this.formData = {}
        this.contactForm.reset();
        this.getContactList();
      });
    }


  }


  ContactDetailsToEdit(id: string) {

    this.contactsService.getContactDetailsById(id).subscribe((contactResult: any) => {

      this.formData.Id = contactResult[0].id;
      this.formData.firstName = contactResult[0].firstName;
      this.formData.lastName = contactResult[0].lastName;
      this.formData.email = contactResult[0].email;
      this.formData.phoneNumber = contactResult[0].phoneNumber;
      this.formData.address = contactResult[0].address;
      this.formData.city = contactResult[0].city;
      this.formData.state = contactResult[0].state;
      this.formData.country = contactResult[0].country;
      this.formData.postalCode = contactResult[0].postalCode;

    });
  }


  DeleteContact(id: number) {

    if (confirm('Delete Contact","Are you sure want to Delete?"')) {
      debugger;
      this.contactsService.deleteContactById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getContactList();
      });
    }
  }


  Close() {
    this.formData = {};
    this.contactForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
