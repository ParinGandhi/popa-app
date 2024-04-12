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

@Component({
  selector: 'app-part-time',
  templateUrl: './part-time.component.html',
  styleUrls: ['./part-time.component.scss'],
})
export class PartTimeComponent implements OnInit {
  partTimeForm: any;
  partTimeFormFields: Array<any> = new Array<any>();
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

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  async ngOnInit() {
    const dataFromService = await this.supabaseService.getFormsData();
    // console.log(dataFromService);
    this.httpClient.get('assets/payload.json').subscribe((buttonsData) => {
      console.log(buttonsData);
      this.jsonData = buttonsData;
    });
    if (dataFromService && dataFromService.data) {
      // const formFields = dataFromService.data[0].html_value.fields.map(
      //   (el: { formControlName: string }) => el.formControlName
      // );
      // console.log('FormControlNames: ', formFields);
      // console.log(dataFromService.data[0].html_data);
      let formGroupObj: any = {};
      for (const key of dataFromService.data[0].html_value.fields) {
        // console.log('Key: ', key);
        formGroupObj[key.formControlName] = key.value;
      }

      // console.log(formGroupObj);
      this.partTimeForm = this.fb.group(formGroupObj);

      this.partTimeFormFields = dataFromService.data[0].html_value.fields;
    }
  }

  submitForm() {
    let obj = {
      empName: '',
      empNumber: '',
      oagUnit: '',
      phoneNumb: '',
      currentPTPP: false,
      renewPP: false,
      changeHours: false,
      currentReqStartDt: '',
      empSign: '',
    };
    obj.empName = (<HTMLInputElement>(
      document.getElementById('empName')
    )).value.toString();
    obj.empNumber = (<HTMLInputElement>(
      document.getElementById('empNum')
    )).value.toString();
    obj.oagUnit = (<HTMLInputElement>(
      document.getElementById('oagArt')
    )).value.toString();
    obj.phoneNumb = (<HTMLInputElement>(
      document.getElementById('phoneNum')
    )).value.toString();
    obj.currentPTPP = (<HTMLInputElement>(
      document.getElementById('partProg')
    )).checked;
    obj.renewPP = (<HTMLInputElement>(
      document.getElementById('renProg')
    )).checked;
    obj.changeHours = (<HTMLInputElement>(
      document.getElementById('reqHours')
    )).checked;
    obj.currentReqStartDt = (<HTMLInputElement>(
      document.getElementById('reqStartDt')
    )).value.toString();
    obj.empSign = this.value;
    console.log(obj);

    // (<HTMLInputElement>document.getElementById("empName")).value = "test";

    console.log(this.partTimeForm);
    // console.log(this.testForm.get('employeeName').value);
    // console.log(this.testForm.get('employeeNumber').value);
    // console.log(this.testForm.get('isMember').value);
    // console.log(this.testForm.get('comments').value);
    // console.log(this.testForm.get('gender').value);
  }

  public onSave() {
    console.log(this.value, 'signature.png');
  }

  public onClear() {
    this.value = '';
    // this.cleanupImage();
  }

  onButtonClick(buttondata: any, index: any) {
    buttondata.value = 'newValue';
    console.log(buttondata);
    console.log(index);
  }
}
