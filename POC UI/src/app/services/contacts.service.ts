import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacts } from '../Models/Contacts';
import configurl from '../../assets/config/config.json'


@Injectable({
  providedIn: 'root'
})
export class ContactsService {


  url = configurl.apiServer.url + '/api/contact/';
  constructor(private http: HttpClient) { }
  getContactList(): Observable<Contacts[]> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<Contacts[]>(this.url + 'getcontactlist',httpHeaders);
  }
  postContactData(contactData: Contacts): Observable<Contacts> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Contacts>(this.url + 'addContact', contactData, httpHeaders);
  }
  updateContact(contact: Contacts): Observable<Contacts> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<Contacts>(this.url + 'updateContact?id=' + contact.id, contact, httpHeaders);
  }
  deleteContactById(id: number): Observable<number> {
    return this.http.delete<number>(this.url + 'deletecontact?id=' + id);
  }
  getContactDetailsById(id: string): Observable<Contacts> {
    return this.http.get<Contacts>(this.url + 'getcontactbyid?id=' + id);
  }
}
