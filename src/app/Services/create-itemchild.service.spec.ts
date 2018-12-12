import { TestBed } from '@angular/core/testing';

import { CreateItemchildService } from './create-itemchild.service';

describe('CreateItemchildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateItemchildService = TestBed.get(CreateItemchildService);
    expect(service).toBeTruthy();
  });
});
