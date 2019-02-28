import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCardPage } from './choose-card.page';

describe('ChooseCardPage', () => {
  let component: ChooseCardPage;
  let fixture: ComponentFixture<ChooseCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
