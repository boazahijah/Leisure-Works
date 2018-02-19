import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRingToneComponent } from './list-ring-tone.component';

describe('ListRingToneComponent', () => {
  let component: ListRingToneComponent;
  let fixture: ComponentFixture<ListRingToneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRingToneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRingToneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
