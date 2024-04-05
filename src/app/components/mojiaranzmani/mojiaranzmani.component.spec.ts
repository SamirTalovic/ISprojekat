import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiaranzmaniComponent } from './mojiaranzmani.component';

describe('MojiaranzmaniComponent', () => {
  let component: MojiaranzmaniComponent;
  let fixture: ComponentFixture<MojiaranzmaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojiaranzmaniComponent]
    });
    fixture = TestBed.createComponent(MojiaranzmaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
