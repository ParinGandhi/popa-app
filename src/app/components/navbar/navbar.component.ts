import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ButtonSize,
  ButtonRounded,
  ButtonFillMode,
  ButtonThemeColor,
} from '@progress/kendo-angular-buttons';
import { HttpClient } from '@angular/common/http';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
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
  formInstanceId: any = null;
  loggedInUser: string | null = null;
  data = [{ text: 'Log Out' }];
  currentlyActiveForm: string | null = null;

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
  }

  getFormsMenu() {
    this.formsService.getFormsMenu().subscribe((formsMenuResponse) => {
      this.formsMenu = formsMenuResponse;
    });
  }

  goToForm(selectedForm: any) {
    console.log(selectedForm);
    const selectedFormLower = selectedForm.name.toLowerCase();
    window.sessionStorage.setItem('selectedForm', JSON.stringify(selectedForm));
    this.router.navigate(['generic-form-template/initiate']);
  }

  goToSavedForm() {
    this.router.navigate([`generic-form-template/${this.formInstanceId}`]);
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

  userIsLoggedIn() {
    this.loggedInUser = window.sessionStorage.getItem('loggedInUser');
    if (this.loggedInUser) {
      return true;
    } else {
      return false;
    }
  }

  onItemClick() {
    console.log('Logout clicked');
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
