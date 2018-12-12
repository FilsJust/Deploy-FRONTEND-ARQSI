import { TestBed } from '@angular/core/testing';

import { ShowItemchildService } from './show-itemchild.service';

describe('ShowItemchildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowItemchildService = TestBed.get(ShowItemchildService);
    expect(service).toBeTruthy();
  });
});
