import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ButtonSize,
  ButtonRounded,
  ButtonFillMode,
  ButtonThemeColor,
} from '@progress/kendo-angular-buttons';
import { HttpClient } from "@angular/common/http";
import { FormsService } from './services/forms.service';
import { Router } from '@angular/router';

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
  PAPCoverForm: any;
  formFields: Array<any> = new Array<any>();
  papFormFields: Array<any> = new Array<any>();

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
  formsMenu: any;

  constructor(
    private supabaseService: SupabaseService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private formsService: FormsService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  async ngOnInit() {
    this.getFormsMenu();
    // this.httpClient.get("assets/payload.json").subscribe(buttonsData =>{
    //   console.log(buttonsData);
    //   this.jsonData = buttonsData;
    // })
    // this.httpClient.get("assets/papCoverData.json").subscribe(eData =>{
    //   console.log(eData);
    //   this.papCoverData = eData;
    //   this.papFormFields = this.papCoverData?.fields;
    // })
    // console.log(this.papCoverData);
    // // this.testForm = this.fb.group({
    // //   heading: [''],
    // //   secondHeading: [''],
    // // });
    // // this.testForm = this.fb.group({});
    // const dataFromService = await this.supabaseService.getFormsData();
    // // console.log(dataFromService);
    // if (dataFromService && dataFromService.data) {
    //   // const formFields = dataFromService.data[0].html_value.fields.map(
    //   //   (el: { formControlName: string }) => el.formControlName
    //   // );
    //   // console.log('FormControlNames: ', formFields);
    //   // console.log(dataFromService.data[0].html_data);
    //   let formGroupObj: any = {};
    //   for (const key of dataFromService.data[0].html_value.fields) {
    //     // console.log('Key: ', key);
    //     formGroupObj[key.formControlName] = key.value;
    //   }

    //   // console.log(formGroupObj);
    //   this.testForm = this.fb.group(formGroupObj);

    //   this.formFields = dataFromService.data[0].html_value.fields;
    // }

    // if (dataFromService && dataFromService.data) {
    //   this.myData = this.sanitizer.bypassSecurityTrustHtml(
    //     dataFromService.data[0].html_data
    //   );
    //   // console.log(this.myData);
    //   // var ele = (<HTMLInputElement>document.getElementById("sigDiv"));
    //   // ele.innerHTML += "<p>test</p>";

    //   // setTimeout(() => {
    //   //   this.testForm
    //   //     .get('heading')
    //   //     .setValue(dataFromService.data[0].html_value.heading);
    //   //   this.testForm
    //   //     .get('secondHeading')
    //   //     .setValue(dataFromService.data[0].html_value.secondHeading);
    //   //   this.testForm.updateValueAndValidity();

    //     // this.testForm
    //     //   .get('heading')
    //     //   ?.patchValue(dataFromService.data[0].html_value.heading);
    //     // this.testForm
    //     //   .get('secondHeading')
    //     //   ?.patchValue(dataFromService.data[0].html_value.secondHeading);
    //   // }, 2000);
    //   // console.log('Data: ', this.myData);

    //   // setTimeout(() => {
    //   //   const h3Tag = document.getElementById('h3_text');
    //   //   if (h3Tag) {
    //   //     h3Tag.innerHTML = dataFromService.data[0].html_value.inputValue;
    //   //   }
    //   // }, 500);
    // }
  }

  getFormsMenu() {
    this.formsService.getFormsMenu().subscribe((formsMenuResponse) => {
      this.formsMenu = formsMenuResponse;
    });
  }

  goToForm(selectedForm: any) {
    console.log(selectedForm);
    const selectedFormLower = selectedForm.name.toLowerCase();
    window.sessionStorage.setItem("selectedForm", JSON.stringify(selectedForm));
    this.router.navigate(['generic-form-template/initiate'])
    // switch (selectedFormLower) {
    //   case 'pap_2023':
    //     this.router.navigate(['pap-cover/initiate']);
    //     break;
    //   case 'pap_2024':
    //     this.router.navigate(['pap-cover/initiate']);
    //     break;
    //   case 'part-time':
    //     this.router.navigate(['part-time']);
    //     break;
    //   case 'rating':
    //     this.router.navigateByUrl('new-ratings/initiate');
    //     break;
    //   case 'ratingsaved':
    //     this.router.navigateByUrl('new-ratings/1');
    //   break;
    //   default:
    //     break;
    // }

  }

  goToSavedForm() {
    this.router.navigate(['new-ratings/1']);
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

    console.log(this.testForm);
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
