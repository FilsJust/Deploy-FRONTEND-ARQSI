import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemchildComponent } from './edit-itemchild.component';

describe('EditItemchildComponent', () => {
  let component: EditItemchildComponent;
  let fixture: ComponentFixture<EditItemchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
