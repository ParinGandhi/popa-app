import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapCoverComponent } from './pap-cover.component';

describe('PapCoverComponent', () => {
  let component: PapCoverComponent;
  let fixture: ComponentFixture<PapCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PapCoverComponent]
    });
    fixture = TestBed.createComponent(PapCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
