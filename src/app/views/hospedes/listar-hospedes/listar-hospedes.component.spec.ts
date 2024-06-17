import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHospedesComponent } from './listar-hospedes.component';

describe('ListarHospedesComponent', () => {
  let component: ListarHospedesComponent;
  let fixture: ComponentFixture<ListarHospedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHospedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
