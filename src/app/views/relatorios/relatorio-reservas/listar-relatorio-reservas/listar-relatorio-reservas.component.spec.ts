import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRelatorioReservasComponent } from './listar-relatorio-reservas.component';

describe('ListarRelatorioReservasComponent', () => {
  let component: ListarRelatorioReservasComponent;
  let fixture: ComponentFixture<ListarRelatorioReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRelatorioReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRelatorioReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
