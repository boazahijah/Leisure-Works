import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRingToneComponent } from './add-ring-tone.component';

describe('AddRingToneComponent', () => {
  let component: AddRingToneComponent;
  let fixture: ComponentFixture<AddRingToneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRingToneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRingToneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
