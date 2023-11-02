import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetasUsuariosComponent } from './targetas-usuarios.component';

describe('TargetasUsuariosComponent', () => {
  let component: TargetasUsuariosComponent;
  let fixture: ComponentFixture<TargetasUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetasUsuariosComponent]
    });
    fixture = TestBed.createComponent(TargetasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
