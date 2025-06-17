import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFinanceiroComponent } from './listar-financeiro.component';

describe('ListarFinanceiroComponent', () => {
  let component: ListarFinanceiroComponent;
  let fixture: ComponentFixture<ListarFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
