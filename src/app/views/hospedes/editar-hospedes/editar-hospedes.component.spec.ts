import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHospedesComponent } from './editar-hospedes.component';

describe('EditarHospedesComponent', () => {
  let component: EditarHospedesComponent;
  let fixture: ComponentFixture<EditarHospedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHospedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
