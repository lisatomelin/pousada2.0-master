import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirQuartosComponent } from './excluir-quartos.component';

describe('ExcluirQuartosComponent', () => {
  let component: ExcluirQuartosComponent;
  let fixture: ComponentFixture<ExcluirQuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirQuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
