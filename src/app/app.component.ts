import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'popa-app';
  myData: any;
  cleanedData: any;
  testForm: any;
  formFields: Array<any> = new Array<any>();

  constructor(
    private supabaseService: SupabaseService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    // this.testForm = this.fb.group({
    //   heading: [''],
    //   secondHeading: [''],
    // });
    // this.testForm = this.fb.group({});
    const dataFromService = await this.supabaseService.getFormsData();
    console.log(dataFromService);
    if (dataFromService && dataFromService.data) {
      // const formFields = dataFromService.data[0].html_value.fields.map(
      //   (el: { formControlName: string }) => el.formControlName
      // );
      // console.log('FormControlNames: ', formFields);

      let formGroupObj: any = {};
      for (const key of dataFromService.data[0].html_value.fields) {
        console.log('Key: ', key);
        formGroupObj[key.formControlName] = key.value;
      }

      console.log(formGroupObj);
      this.testForm = this.fb.group(formGroupObj);

      this.formFields = dataFromService.data[0].html_value.fields;
    }

    // if (dataFromService && dataFromService.data) {
    //   this.myData = this.sanitizer.bypassSecurityTrustHtml(
    //     dataFromService.data[0].html_data
    //   );
    //   setTimeout(() => {
    //     this.testForm
    //       .get('heading')
    //       .setValue(dataFromService.data[0].html_value.heading);
    //     this.testForm
    //       .get('secondHeading')
    //       .setValue(dataFromService.data[0].html_value.secondHeading);
    //     this.testForm.updateValueAndValidity();

    //     // this.testForm
    //     //   .get('heading')
    //     //   ?.patchValue(dataFromService.data[0].html_value.heading);
    //     // this.testForm
    //     //   .get('secondHeading')
    //     //   ?.patchValue(dataFromService.data[0].html_value.secondHeading);
    //   }, 2000);
    //   // console.log('Data: ', this.myData);

    //   // setTimeout(() => {
    //   //   const h3Tag = document.getElementById('h3_text');
    //   //   if (h3Tag) {
    //   //     h3Tag.innerHTML = dataFromService.data[0].html_value.inputValue;
    //   //   }
    //   // }, 500);
    // }
  }

  submitForm() {
    console.log(this.testForm);
    console.log(this.testForm.get('firstName').value);
    console.log(this.testForm.get('age').value);
    console.log(this.testForm.get('isMember').value);
    console.log(this.testForm.get('comments').value);
  }
}
