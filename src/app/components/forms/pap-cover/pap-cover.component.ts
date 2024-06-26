import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ButtonSize,
  ButtonRounded,
  ButtonFillMode,
  ButtonThemeColor,
} from '@progress/kendo-angular-buttons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-pap-cover',
  templateUrl: './pap-cover.component.html',
  styleUrls: ['./pap-cover.component.scss'],
})
export class PapCoverComponent implements OnInit {
  PAPCoverForm: any;
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

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    // this.httpClient.get('assets/payload.json').subscribe((buttonsData) => {
    //   console.log(buttonsData);
    //   this.jsonData = buttonsData;
    // });
    const id = this.route.snapshot.paramMap.get('id');

    if (id && !isNaN(parseInt(id))) {
      console.log('Firing ngOnInit');
      this.httpClient
        .get('assets/papCoverData_new copy.json')
        .subscribe((eData: any) => {
          console.log(eData);
          this.papCoverData = eData;
          this.papFormFields = eData?.formDataStructure;
        });
    } else {
      this.getInitialForm();
    }
    // this.httpClient.get('assets/papCoverData_new.json').subscribe((eData:any) => {
    //   // console.log(eData);
    //   this.papCoverData = eData;
    //   // this.papFormFields = this.papCoverData?.fields;
    //   // this.PAPCoverForm = this.fb.group(eData?.formObject);
    //   this.papFormFields = eData?.formDataStructure;
    // });
  }

  getInitialForm() {
    this.formsService.getFormsMenu().subscribe((formsMenuResponse: any) => {
      const papCoverMenu = formsMenuResponse.find((indMenu: any) => {
        return indMenu.name.toLowerCase() == 'pap_2023';
      });
       this.papCoverData = papCoverMenu;
       this.papFormFields = papCoverMenu?.formDataStructure;
    });


    this.httpClient
      .get('assets/papCoverData_new.json')
      .subscribe((eData: any) => {
        // console.log(eData);
        this.papCoverData = eData;
        // this.papFormFields = this.papCoverData?.fields;
        // this.PAPCoverForm = this.fb.group(eData?.formObject);
        this.papFormFields = eData?.formDataStructure;
      });
  }

  logJson() {
    console.log(this.papFormFields);
  }
}
