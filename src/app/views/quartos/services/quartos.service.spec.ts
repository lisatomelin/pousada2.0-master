import { TestBed } from '@angular/core/testing';

import { QuartosService } from './quartos.service';

describe('QuartosService', () => {
  let service: QuartosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuartosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
