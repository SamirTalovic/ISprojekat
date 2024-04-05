import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AranzmaniComponent } from './aranzmani.component';

describe('AranzmaniComponent', () => {
  let component: AranzmaniComponent;
  let fixture: ComponentFixture<AranzmaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AranzmaniComponent]
    });
    fixture = TestBed.createComponent(AranzmaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
