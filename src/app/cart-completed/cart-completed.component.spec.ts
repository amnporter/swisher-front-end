import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCompletedComponent } from './cart-completed.component';

describe('CartCompletedComponent', () => {
  let component: CartCompletedComponent;
  let fixture: ComponentFixture<CartCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
