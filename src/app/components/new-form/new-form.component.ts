import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent implements OnInit {
  jsonData: any;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  async ngOnInit() {
    this.httpClient.get('assets/newOayload.json').subscribe((buttonsData) => {
      console.log(buttonsData);
      this.jsonData = buttonsData;
    });
  }
}
