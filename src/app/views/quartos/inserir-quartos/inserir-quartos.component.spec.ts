import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirQuartosComponent } from './inserir-quartos.component';

describe('InserirQuartosComponent', () => {
  let component: InserirQuartosComponent;
  let fixture: ComponentFixture<InserirQuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirQuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
