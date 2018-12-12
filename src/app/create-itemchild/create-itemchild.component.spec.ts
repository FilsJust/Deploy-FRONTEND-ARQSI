import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemchildComponent } from './create-itemchild.component';

describe('CreateItemchildComponent', () => {
  let component: CreateItemchildComponent;
  let fixture: ComponentFixture<CreateItemchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
