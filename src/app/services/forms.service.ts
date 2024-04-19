import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  BASE_URL: string = 'https://localhost';

  constructor(private http: HttpClient) {}

  saveForm(url: string, entireForm: any) {
    return this.http.post(`${this.BASE_URL}${url}`, entireForm);
  }

  updateForm(url: string, entireForm: any) {
    return this.http.put(`${this.BASE_URL}${url}`, entireForm);
  }

  deleteForm(url: string, entireForm: any) {
    return this.http.delete(`${this.BASE_URL}${url}`, entireForm);
  }
}
