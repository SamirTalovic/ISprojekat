import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreirajusluguComponent } from './kreirajuslugu.component';

describe('KreirajusluguComponent', () => {
  let component: KreirajusluguComponent;
  let fixture: ComponentFixture<KreirajusluguComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KreirajusluguComponent]
    });
    fixture = TestBed.createComponent(KreirajusluguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
