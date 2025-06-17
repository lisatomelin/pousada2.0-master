import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFinanceiroComponent } from './editar-financeiro.component';

describe('EditarFinanceiroComponent', () => {
  let component: EditarFinanceiroComponent;
  let fixture: ComponentFixture<EditarFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
