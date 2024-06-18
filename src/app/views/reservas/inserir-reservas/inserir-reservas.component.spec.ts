import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirReservasComponent } from './inserir-reservas.component';

describe('InserirReservasComponent', () => {
  let component: InserirReservasComponent;
  let fixture: ComponentFixture<InserirReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
