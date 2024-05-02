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
  testdate = new Date("Wed May 07 2024 00:00:00 GMT-0400 (Eastern Daylight Time)");

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
        for (var i = 0; i < this.entireForm.formDataStructure.length; i++) {
          if (
            this.entireForm.formDataStructure[i].type == 'date' &&
            this.entireForm.formDataStructure[i].value
          ) {
            this.entireForm.formDataStructure[i].value = new Date(
              this.entireForm.formDataStructure[i].value
            );
          }
          if (this.entireForm.formDataStructure[i].children) {
            for (
              var j = 0;
              j < this.entireForm.formDataStructure[i].children.length;
              j++
            ) {
              if (
                this.entireForm.formDataStructure[i].children[j].type ==
                  'date' &&
                this.entireForm.formDataStructure[i].children[j].value
              ) {
                this.entireForm.formDataStructure[i].children[j].value =
                  new Date(
                    this.entireForm.formDataStructure[i].children[j].value
                  );
              }
            }
          }
        }
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
      for(var i=0;i<this.entireForm.formDataStructure.length;i++){
        if(this.entireForm.formDataStructure[i].type=="date" && this.entireForm.formDataStructure[i].value){
          this.entireForm.formDataStructure[i].value = new Date(this.entireForm.formDataStructure[i].value);
        }
        if(this.entireForm.formDataStructure[i].children){
          for(var j=0;j<this.entireForm.formDataStructure[i].children.length;j++){
            if(this.entireForm.formDataStructure[i].children[j].type=="date" && this.entireForm.formDataStructure[i].children[j].value){
              this.entireForm.formDataStructure[i].children[j].value = new Date(this.entireForm.formDataStructure[i].children[j].value);
            }
          }
        }
      }
      this.loading = false;
      this.toastr.success('Initiate', 'New form loaded');
    }
  }
}
