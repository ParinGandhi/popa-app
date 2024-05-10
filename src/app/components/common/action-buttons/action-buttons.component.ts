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
  }

  initiateForm(actionItem: any) {
    if(this.checkValidations()){    
    this.formsService
      .initiateForm(actionItem.value, this.entireForm)
      .pipe(take(1))
      .subscribe((formResponse: any) => {
        window.sessionStorage.setItem(
          'selectedForm',
          JSON.stringify(formResponse)
        );
        this.router.navigate([
          `generic-form-template/${formResponse.mapsFormsWorkflowStepId}`,
        ]);
      }, (formError) => {
        this.toastr.error('Initiate error', 'There was an issue initiating the form')
      });
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
    this.formsService
      .saveForm(actionItem.value, this.entireForm)
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
    this.formsService
      .updateForm(actionItem.value, this.entireForm)
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
    this.formsService
      .submitForApprovalForm(actionItem.value, this.entireForm)
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
    this.formsService
      .returnForm(actionItem.value, this.entireForm)
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
    this.formsService
      .deleteForm(actionItem.value, this.entireForm)
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

  checkValidations(){
    let returnVal = true;
    for(var i=0;i<this.entireForm.formDataStructure.length;i++){
      if(this.entireForm.formDataStructure[i].required && !this.entireForm.formDataStructure[i].value){
        returnVal = false;
        this.toastr.error(URLS.ERROR_MSG.REQUIRED,'Error');
        break;
      }
      if(this.entireForm.formDataStructure[i].validation == "phone" && this.entireForm.formDataStructure[i].value){
        console.log(this.entireForm.formDataStructure[i].value.match(/\d/g)?.length);
        if(this.entireForm.formDataStructure[i].value.match(/\d/g)?.length != 10){
          returnVal = false;
          this.toastr.error(URLS.ERROR_MSG.PHONE,'Error');
          break;
        }
        if(!this.phoneNumberValidation(this.entireForm.formDataStructure[i].value)){
          returnVal = false;
          this.toastr.error(URLS.ERROR_MSG.PHONE,'Error');
          break;
        }
      }
      if(this.entireForm.formDataStructure[i].children){
        for(var j=0;j<this.entireForm.formDataStructure[i].children.length;j++){
          if(this.entireForm.formDataStructure[i].children[j].required && !this.entireForm.formDataStructure[i].children[j].value){
            returnVal = false;
            this.toastr.error(URLS.ERROR_MSG.REQUIRED,'Error');
            break;
          }
          if(this.entireForm.formDataStructure[i].children[j].validation == "phone" && this.entireForm.formDataStructure[i].children[j].value){
            returnVal = false;
            this.toastr.error(URLS.ERROR_MSG.PHONE,'Error');
            break;
          }
        }
      }
    }
    return returnVal; 
  }

  phoneNumberValidation(phone:any){
  var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  return phoneRe.test(phone);
  }
}
