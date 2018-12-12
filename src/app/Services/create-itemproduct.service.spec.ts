import { TestBed } from '@angular/core/testing';

import { CreateItemproductService } from './create-itemproduct.service';

describe('CreateItemproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateItemproductService = TestBed.get(CreateItemproductService);
    expect(service).toBeTruthy();
  });
});
