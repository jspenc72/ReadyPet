/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PuppyFormComponent } from './puppy-form.component';

describe('PuppyFormComponent', () => {
  let component: PuppyFormComponent;
  let fixture: ComponentFixture<PuppyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuppyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuppyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
