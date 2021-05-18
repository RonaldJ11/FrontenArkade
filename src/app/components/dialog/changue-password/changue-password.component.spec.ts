import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanguePasswordComponent } from './changue-password.component';

describe('ChanguePasswordComponent', () => {
  let component: ChanguePasswordComponent;
  let fixture: ComponentFixture<ChanguePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanguePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanguePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
