import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItemchildComponent } from './show-itemchild.component';

describe('ShowItemchildComponent', () => {
  let component: ShowItemchildComponent;
  let fixture: ComponentFixture<ShowItemchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowItemchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItemchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
