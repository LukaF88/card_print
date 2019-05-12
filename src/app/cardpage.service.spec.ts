import { TestBed } from '@angular/core/testing';

import { CardpageService } from './cardpage.service';

describe('CardpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardpageService = TestBed.get(CardpageService);
    expect(service).toBeTruthy();
  });
});
