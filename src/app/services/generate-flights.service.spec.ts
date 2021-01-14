import { TestBed } from '@angular/core/testing';

import { GenerateFlightsService } from './generate-flights.service';

describe('GenerateFlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateFlightsService = TestBed.get(GenerateFlightsService);
    expect(service).toBeTruthy();
  });
});
