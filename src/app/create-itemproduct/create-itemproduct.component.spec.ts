import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemproductComponent } from './create-itemproduct.component';

describe('CreateItemproductComponent', () => {
  let component: CreateItemproductComponent;
  let fixture: ComponentFixture<CreateItemproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
