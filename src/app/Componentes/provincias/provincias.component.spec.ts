import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciasComponent } from './provincias.component';

describe('ProvinciasComponent', () => {
  let component: ProvinciasComponent;
  let fixture: ComponentFixture<ProvinciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvinciasComponent]
    });
    fixture = TestBed.createComponent(ProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
