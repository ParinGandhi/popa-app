import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  @Input() entireForm: any;

  constructor(private formsService: FormsService) {}

  performAction(actionItem: any) {
    switch (actionItem.type) {
      case 'initiate':
        this.saveForm(actionItem);
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

  saveForm(actionItem: any) {
    this.formsService
      .saveForm(actionItem.value, this.entireForm)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          console.log('Complete');
        }, // completeHandler
        error: () => {
          console.log('Error');
        }, // errorHandler
        next: () => {
          console.log('Next');
        }, // nextHandler
      });
  }

  updateForm(actionItem: any) {
    this.formsService
      .updateForm(actionItem.value, this.entireForm)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          console.log('Complete');
        }, // completeHandler
        error: () => {
          console.log('Error');
        }, // errorHandler
        next: () => {
          console.log('Next');
        }, // nextHandler
      });
  }

  deleteForm(actionItem: any) {
    this.formsService
      .deleteForm(actionItem.value, this.entireForm)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          console.log('Complete');
        }, // completeHandler
        error: () => {
          console.log('Error');
        }, // errorHandler
        next: () => {
          console.log('Next');
        }, // nextHandler
      });
  }
}
