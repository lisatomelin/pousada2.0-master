import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirReservasComponent } from './excluir-reservas.component';

describe('ExcluirReservasComponent', () => {
  let component: ExcluirReservasComponent;
  let fixture: ComponentFixture<ExcluirReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
