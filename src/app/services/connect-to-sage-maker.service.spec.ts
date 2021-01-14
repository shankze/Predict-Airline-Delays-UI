import { TestBed } from '@angular/core/testing';

import { ConnectToSageMakerService } from './connect-to-sage-maker.service';

describe('ConnectToSageMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectToSageMakerService = TestBed.get(ConnectToSageMakerService);
    expect(service).toBeTruthy();
  });
});
