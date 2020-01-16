import { TestBed } from '@angular/core/testing';

import { StService } from './st.service';

describe('StService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StService = TestBed.get(StService);
    expect(service).toBeTruthy();
  });
});
