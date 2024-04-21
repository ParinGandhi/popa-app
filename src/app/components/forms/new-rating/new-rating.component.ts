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
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-new-rating',
  templateUrl: './new-rating.component.html',
  styleUrls: ['./new-rating.component.scss'],
})
export class NewRatingComponent {
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
  checked: boolean = false;
  entireForm: any;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    // console.log(jsontohtml)
    if (id && !isNaN(parseInt(id))) {
      console.log('Firing ngOnInit');
      this.httpClient
        .get('assets/newRatingPayload.json')
        .subscribe((ratingData: any) => {
          console.log(ratingData);
          this.entireForm = ratingData;
          this.ratingFormFields = ratingData.formDataStructure;
          this.loading = false;
        });
    } else {
      this.getInitialForm();
    }
    // if (this.ratingFormFields) {
    //   let formGroupObj: any = {};
    //   for (const key of this.ratingFormFields) {
    //     formGroupObj[key.formControlName] = key.value;
    //   }

    //   this.ratingForm = this.fb.group(formGroupObj);

    //   // this.partTimeFormFields = dataFromService.data[0].html_value.fields;
    // }
  }

  getInitialForm() {
    this.formsService.getFormsMenu().subscribe((formsMenuResponse: any) => {
      const ratingMenu = formsMenuResponse.find((indMenu: any) => {
        return indMenu.name.toLowerCase() == 'rating';
      });
      this.entireForm = ratingMenu;
      this.ratingFormFields = ratingMenu.formDataStructure;
      this.loading = false;
    });
  }

  logJson() {
    console.log(this.ratingFormFields);
  }
}
