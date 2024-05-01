import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      case 'delete':
        this.deleteForm(actionItem);
        break;
      default:
        break;
    }
  }

  initiateForm(actionItem: any) {
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
          this.toastr.error(
            'Save error',
            'There was an issue saving the form'
          );
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
          this.toastr.error(
            'Update error',
            'There was an issue updating the form'
          );
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
          this.toastr.error(
            'Delete error',
            'There was an issue deleting the form'
          );
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
}
