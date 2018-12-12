import { TestBed } from '@angular/core/testing';

import { EditItemFatherService } from './edit-item-father.service';

describe('EditItemFatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditItemFatherService = TestBed.get(EditItemFatherService);
    expect(service).toBeTruthy();
  });
});
