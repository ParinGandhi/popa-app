import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import {
  ButtonSize,
  ButtonRounded,
  ButtonFillMode,
  ButtonThemeColor,
} from '@progress/kendo-angular-buttons';
import { HttpClient } from '@angular/common/http';
declare let jsontohtml: any;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  ratingForm: any;
  ratingFormFields: any;
  public size: ButtonSize = 'large';
  public rounded: ButtonRounded = 'medium';
  public fillMode: ButtonFillMode = 'outline';
  public themeColor: ButtonThemeColor = 'info';
  public testclass = 'col-md-6';
  value: any;
  dirSignValue: any;
  supValue: any;
  jsonData: any;
  papCoverData: any;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    // console.log(jsontohtml)
    console.log('Firing ngOnInit')
    this.httpClient.get('assets/newPayload.json').subscribe((ratingData: any) => {
      console.log(ratingData);
      this.ratingForm = this.fb.group(ratingData.formObject);
      this.ratingFormFields = ratingData.formDataStructure;
      this.loading = false;
    });
    // if (this.ratingFormFields) {
    //   let formGroupObj: any = {};
    //   for (const key of this.ratingFormFields) {
    //     formGroupObj[key.formControlName] = key.value;
    //   }

    //   this.ratingForm = this.fb.group(formGroupObj);

    //   // this.partTimeFormFields = dataFromService.data[0].html_value.fields;
    // }
  }



}
