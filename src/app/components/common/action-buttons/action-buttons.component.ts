import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URLS } from 'src/app/constants/URLS.constants';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent implements OnInit {
  @Input() entireForm: any;

  constructor(
    private formsService: FormsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('From action buttons: ', this.entireForm);
  }

  performAction(actionItem: any) {
    switch (actionItem.type) {
      case 'initiate':
        this.initiateForm(actionItem);
        break;
      case 'save':
        this.saveForm(actionItem);
        break;
      case 'update':
        this.updateForm(actionItem);
        break;
      case 'submitApproval':
        this.submitApprovalForm(actionItem);
        break;
      case 'return':
        this.returnForm(actionItem);
        break;
      case 'delete':
        this.deleteForm(actionItem);
        break;
      default:
        break;
    }
    // TODO Add option and function for complete

    // TODO Eventually replace above with common CRUD functions. Services will give CRUD type (POST, PUT, GET, DELETE)
  }

  initiateForm(actionItem: any) {
    this.mapToFormValues();
    if (this.checkValidations()) {
      let strippedForm = this.removeFormDataStructure();
      this.formsService
        .initiateForm(actionItem.value, strippedForm)
        .pipe(take(1))
        .subscribe(
          (formResponse: any) => {
            window.sessionStorage.setItem(
              'selectedForm',
              JSON.stringify(formResponse)
            );
            this.router.navigate([
              `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
            ]);
          },
          (formError) => {
            this.toastr.error(
              'Initiate error',
              'There was an issue initiating the form'
            );
          }
        );
    }
    // .subscribe({
    //   complete: (formResponse: any) => {
    //     window.sessionStorage.setItem(
    //       'selectedForm',
    //       JSON.stringify(formResponse)
    //     );
    //     console.log('Complete');
    //   }, // completeHandler
    //   error: () => {
    //     console.log('Error');
    //   }, // errorHandler
    //   next: () => {
    //     console.log('Next');
    //   }, // nextHandler
    // });
  }

  saveForm(actionItem: any) {
    this.mapToFormValues();
    let strippedForm = this.removeFormDataStructure();
    this.formsService
      .saveForm(actionItem.value, strippedForm)
      .pipe(take(1))
      .subscribe(
        (formResponse: any) => {
          window.sessionStorage.setItem(
            'selectedForm',
            JSON.stringify(formResponse)
          );
          this.router.navigate([
            `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
          ]);
        },
        (formError) => {
          this.toastr.error('Save error', `${formError.message}`);
        }
      );
    // .subscribe({
    //   complete: () => {
    //     console.log('Complete');
    //   }, // completeHandler
    //   error: () => {
    //     console.log('Error');
    //   }, // errorHandler
    //   next: () => {
    //     console.log('Next');
    //   }, // nextHandler
    // });
  }

  updateForm(actionItem: any) {
    this.mapToFormValues();
    let strippedForm = this.removeFormDataStructure();
    this.formsService
      .updateForm(actionItem.value, strippedForm)
      .pipe(take(1))
      .subscribe(
        (formResponse: any) => {
          window.sessionStorage.setItem(
            'selectedForm',
            JSON.stringify(formResponse)
          );
          this.router.navigate([
            `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
          ]);
        },
        (formError) => {
          this.toastr.error('Update error', `${formError.message}`);
        }
      );
    // .subscribe({
    //   complete: () => {
    //     console.log('Complete');
    //   }, // completeHandler
    //   error: () => {
    //     console.log('Error');
    //   }, // errorHandler
    //   next: () => {
    //     console.log('Next');
    //   }, // nextHandler
    // });
  }

  submitApprovalForm(actionItem: any) {
    this.mapToFormValues();
    let strippedForm = this.removeFormDataStructure();
    this.formsService
      .submitForApprovalForm(actionItem.value, strippedForm)
      .pipe(take(1))
      .subscribe(
        (formResponse: any) => {
          window.sessionStorage.setItem(
            'selectedForm',
            JSON.stringify(formResponse)
          );
          this.router.navigate([
            `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
          ]);
        },
        (formError) => {
          this.toastr.error('submitApproval error', `${formError.message}`);
        }
      );
  }

  returnForm(actionItem: any) {
    let strippedForm = this.removeFormDataStructure();
    this.formsService
      .returnForm(actionItem.value, strippedForm)
      .pipe(take(1))
      .subscribe(
        (formResponse: any) => {
          window.sessionStorage.setItem(
            'selectedForm',
            JSON.stringify(formResponse)
          );
          this.router.navigate([
            `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
          ]);
        },
        (formError) => {
          this.toastr.error('Return error', `${formError.message}`);
        }
      );
  }

  deleteForm(actionItem: any) {
    let strippedForm = this.removeFormDataStructure();
    this.formsService
      .deleteForm(actionItem.value, strippedForm)
      .pipe(take(1))
      .subscribe(
        (formResponse: any) => {
          window.sessionStorage.setItem(
            'selectedForm',
            JSON.stringify(formResponse)
          );
          this.router.navigate([
            `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
          ]);
        },
        (formError) => {
          this.toastr.error('Delete error', `${formError.message}`);
        }
      );
    // .subscribe({
    //   complete: () => {
    //     console.log('Complete');
    //   }, // completeHandler
    //   error: () => {
    //     console.log('Error');
    //   }, // errorHandler
    //   next: () => {
    //     console.log('Next');
    //   }, // nextHandler
    // });
  }

  checkValidations() {
    let returnVal = true;
    for (var i = 0; i < this.entireForm.formDataStructure.length; i++) {
      if (
        this.entireForm.formDataStructure[i].required &&
        !this.entireForm.formDataStructure[i].value
      ) {
        returnVal = false;
        // this.toastr.error(URLS.ERROR_MSG.REQUIRED, 'Error');
        break;
      }
      if (
        this.entireForm.formDataStructure[i].validation == 'phone' &&
        this.entireForm.formDataStructure[i].value
      ) {
        console.log(
          this.entireForm.formDataStructure[i].value.match(/\d/g)?.length
        );
        if (
          this.entireForm.formDataStructure[i].value.match(/\d/g)?.length != 10
        ) {
          returnVal = false;
          // this.toastr.error(URLS.ERROR_MSG.PHONE, 'Error');
          break;
        }
        if (
          !this.phoneNumberValidation(
            this.entireForm.formDataStructure[i].value
          )
        ) {
          returnVal = false;
          // this.toastr.error(URLS.ERROR_MSG.PHONE, 'Error');
          break;
        }
      }
      if (this.entireForm.formDataStructure[i].children) {
        for (
          var j = 0;
          j < this.entireForm.formDataStructure[i].children.length;
          j++
        ) {
          if (
            this.entireForm.formDataStructure[i].children[j].required &&
            !this.entireForm.formDataStructure[i].children[j].value
          ) {
            returnVal = false;
            // this.toastr.error(URLS.ERROR_MSG.REQUIRED, 'Error');
            break;
          }
          if (
            this.entireForm.formDataStructure[i].children[j].validation ==
              'phone' &&
            this.entireForm.formDataStructure[i].children[j].value
          ) {
            returnVal = false;
            // this.toastr.error(URLS.ERROR_MSG.PHONE, 'Error');
            break;
          }
        }
      }
    }
    return returnVal;
  }

  phoneNumberValidation(phone: any) {
    var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return phoneRe.test(phone);
  }

  mapToFormValues() {
    for (var i = 0; i < this.entireForm?.formDataValue?.length; i++) {
      for (var j = 0; j < this.entireForm?.formDataStructure?.length; j++) {
        if (
          this.entireForm.formDataStructure[j].id ==
          this.entireForm.formDataValue[i].id
        ) {
          if (
            this.entireForm.formDataStructure[j].type == 'radio-inline' ||
            this.entireForm.formDataStructure[j].type == 'radio'
          ) {
            this.entireForm.formDataValue[i].value =
              this.entireForm.formDataStructure[j].selectedValue;
          } else {
            this.entireForm.formDataValue[i].value =
              this.entireForm.formDataStructure[j].value;
          }
        }
        if (this.entireForm.formDataStructure[j].children) {
          for (
            var k = 0;
            k < this.entireForm?.formDataStructure[j]?.children?.length;
            k++
          ) {
            if (
              this.entireForm.formDataStructure[j].children[k].id ==
              this.entireForm.formDataValue[i].id
            ) {
              if (
                this.entireForm.formDataStructure[j].children[k].type ==
                  'radio-inline' ||
                this.entireForm.formDataStructure[j].children[k].type == 'radio'
              ) {
                this.entireForm.formDataValue[i].value =
                  this.entireForm.formDataStructure[j].children[
                    k
                  ].selectedValue;
              } else {
                this.entireForm.formDataValue[i].value =
                  this.entireForm.formDataStructure[j].children[k].value;
              }
            }
          }
        }
      }
    }
  }

  removeFormDataStructure() {
    const strippedForm = JSON.parse(JSON.stringify(this.entireForm));
    // delete strippedForm.formDataStructure;
    return strippedForm;
  }
}
