import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from '../constants/URLS.constants';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  getFormsMenu() {
    const url = `${URLS.BASE_URL}${URLS.GET_FORMS_MENU}`;
    return this.http.get(`${URLS.BASE_URL}${URLS.GET_FORMS_MENU}`);
  }

  initiateForm(url: string, entireForm: any) {
    return this.http.post(`${URLS.BASE_URL}${url}`, entireForm);
  }

  saveForm(url: string, entireForm: any) {
    return this.http.put(`${URLS.BASE_URL}${url}`, entireForm);
  }

  submitForApprovalForm(url: string, entireForm: any) {
    return this.http.put(`${URLS.BASE_URL}${url}`, entireForm);
  }

  returnForm(url: string, entireForm: any) {
    return this.http.put(`${URLS.BASE_URL}${url}`, entireForm);
  }

  updateForm(url: string, entireForm: any) {
    return this.http.put(`${URLS.BASE_URL}${url}`, entireForm);
  }

  deleteForm(url: string, entireForm: any) {
    return this.http.delete(`${URLS.BASE_URL}${url}`, entireForm);
  }

  // getFormInstance(url: string, instanceId: string) {
  getFormInstance(instanceId: string) {
    return this.http.get(
      `${URLS.BASE_URL}${URLS.GET_FORM_BY_ID}/${instanceId}`
    );
  }
}
