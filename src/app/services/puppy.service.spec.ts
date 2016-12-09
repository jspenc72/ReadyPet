/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuppyService } from './puppy.service';

describe('PuppyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuppyService]
    });
  });

  it('should ...', inject([PuppyService], (service: PuppyService) => {
    expect(service).toBeTruthy();
  }));
});
