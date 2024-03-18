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

  constructor(
    private supabaseService: SupabaseService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.testForm = this.fb.group({
      heading: [''],
      secondHeading: [''],
    });

    const dataFromService = await this.supabaseService.getFormsData();
    if (dataFromService && dataFromService.data) {
      this.myData = this.sanitizer.bypassSecurityTrustHtml(
        dataFromService.data[0].html_data
      );
      setTimeout(() => {
        this.testForm
          .get('heading')
          .setValue(dataFromService.data[0].html_value.heading);
        this.testForm
          .get('secondHeading')
          .setValue(dataFromService.data[0].html_value.secondHeading);
        this.testForm.updateValueAndValidity();

        // this.testForm
        //   .get('heading')
        //   ?.patchValue(dataFromService.data[0].html_value.heading);
        // this.testForm
        //   .get('secondHeading')
        //   ?.patchValue(dataFromService.data[0].html_value.secondHeading);
      }, 2000);
      // console.log('Data: ', this.myData);

      // setTimeout(() => {
      //   const h3Tag = document.getElementById('h3_text');
      //   if (h3Tag) {
      //     h3Tag.innerHTML = dataFromService.data[0].html_value.inputValue;
      //   }
      // }, 500);
    }
  }

  submitForm() {
    console.log(this.testForm);
  }
}
