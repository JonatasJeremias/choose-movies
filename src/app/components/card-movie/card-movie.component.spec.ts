import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMoviePage } from './card-movie.page';

describe('CardMoviePage', () => {
  let component: CardMoviePage;
  let fixture: ComponentFixture<CardMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMoviePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
