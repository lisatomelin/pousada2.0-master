import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuartosComponent } from './editar-quartos.component';

describe('EditarQuartosComponent', () => {
  let component: EditarQuartosComponent;
  let fixture: ComponentFixture<EditarQuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarQuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
