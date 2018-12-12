import { TestBed } from '@angular/core/testing';

import { EditItemchildService } from './edit-itemchild.service';

describe('EditItemchildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditItemchildService = TestBed.get(EditItemchildService);
    expect(service).toBeTruthy();
  });
});
