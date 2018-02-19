import { TestBed, inject } from '@angular/core/testing';

import { CategoryCreatorService } from './category-creator.service';

describe('CategoryCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryCreatorService]
    });
  });

  it('should ...', inject([CategoryCreatorService], (service: CategoryCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
