import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirHospedesComponent } from './inserir-hospedes.component';

describe('InserirHospedesComponent', () => {
  let component: InserirHospedesComponent;
  let fixture: ComponentFixture<InserirHospedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirHospedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
