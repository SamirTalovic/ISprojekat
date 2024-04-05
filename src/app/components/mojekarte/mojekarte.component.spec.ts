import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojekarteComponent } from './mojekarte.component';

describe('MojekarteComponent', () => {
  let component: MojekarteComponent;
  let fixture: ComponentFixture<MojekarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojekarteComponent]
    });
    fixture = TestBed.createComponent(MojekarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
