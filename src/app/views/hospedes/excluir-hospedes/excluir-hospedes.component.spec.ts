import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirHospedesComponent } from './excluir-hospedes.component';

describe('ExcluirHospedesComponent', () => {
  let component: ExcluirHospedesComponent;
  let fixture: ComponentFixture<ExcluirHospedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirHospedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
