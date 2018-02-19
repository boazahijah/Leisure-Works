import { TestBed, inject } from '@angular/core/testing';

import { ListRingToneService } from './list-ring-tone.service';

describe('ListRingToneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListRingToneService]
    });
  });

  it('should ...', inject([ListRingToneService], (service: ListRingToneService) => {
    expect(service).toBeTruthy();
  }));
});
