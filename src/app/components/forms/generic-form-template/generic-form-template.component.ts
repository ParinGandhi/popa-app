import { Component, OnInit } from '@angular/core';
import {
  ButtonSize,
  ButtonRounded,
  ButtonFillMode,
  ButtonThemeColor,
} from '@progress/kendo-angular-buttons';
import { FormsService } from 'src/app/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generic-form-template',
  templateUrl: './generic-form-template.component.html',
  styleUrls: ['./generic-form-template.component.scss'],
})
export class GenericFormTemplateComponent implements OnInit {
  public size: ButtonSize = 'large';
  public rounded: ButtonRounded = 'medium';
  public fillMode: ButtonFillMode = 'outline';
  public themeColor: ButtonThemeColor = 'info';
  formFromSession: any;
  entireForm: any;
  formFields: any;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formsService: FormsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formFromSession = window.sessionStorage.getItem('selectedForm');
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;

    if (id && !isNaN(parseInt(id))) {
      // this.formsService.getFormInstance(this.formFromSession, id).subscribe((formResponse: any) => {
      this.formsService.getFormInstance(id).subscribe((formResponse: any) => {
        this.entireForm = formResponse;
        this.formFields = formResponse.formDataStructure;
        this.loading = false;
        this.toastr.success('Retrieve', 'Form loaded');
      })
      // this.httpClient
      //   .get('assets/newRatingPayload.json')
      //   .subscribe((ratingData: any) => {
      //     console.log(ratingData);
      //     this.entireForm = ratingData;
      //     this.formFields = ratingData.formDataStructure;
      //     this.loading = false;
      //   });
    } else {
      this.getInitialForm();
    }
  }

  getInitialForm() {
    // this.formsService.getFormsMenu().subscribe((formsMenuResponse: any) => {
    //   const ratingMenu = formsMenuResponse.find((indMenu: any) => {
    //     return indMenu.name.toLowerCase() == 'rating';
    //   });
    //   this.entireForm = ratingMenu;
    //   this.formFields = ratingMenu.formDataStructure;
    //   this.loading = false;
    // });
    if (this.formFromSession) {
      this.entireForm = JSON.parse(this.formFromSession);
      this.loading = false;
      this.toastr.success('Initiate', 'New form loaded');
    }
  }
}
