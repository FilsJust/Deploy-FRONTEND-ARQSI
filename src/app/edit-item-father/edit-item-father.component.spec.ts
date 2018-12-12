import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemFatherComponent } from './edit-item-father.component';

describe('EditItemFatherComponent', () => {
  let component: EditItemFatherComponent;
  let fixture: ComponentFixture<EditItemFatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemFatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
