import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateeComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateeComponent;
  let fixture: ComponentFixture<CreateeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateeComponent]
    });
    fixture = TestBed.createComponent(CreateeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
