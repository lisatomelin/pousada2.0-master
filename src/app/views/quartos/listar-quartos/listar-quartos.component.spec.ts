import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarQuartosComponent } from './listar-quartos.component';

describe('ListarQuartosComponent', () => {
  let component: ListarQuartosComponent;
  let fixture: ComponentFixture<ListarQuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarQuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
