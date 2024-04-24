import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFormTemplateComponent } from './generic-form-template.component';

describe('GenericFormTemplateComponent', () => {
  let component: GenericFormTemplateComponent;
  let fixture: ComponentFixture<GenericFormTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericFormTemplateComponent]
    });
    fixture = TestBed.createComponent(GenericFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
