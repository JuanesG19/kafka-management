/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCardsComponent } from './countCards.component';

describe('CountCardsComponent', () => {
  let component: CountCardsComponent;
  let fixture: ComponentFixture<CountCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CountCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
