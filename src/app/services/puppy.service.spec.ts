/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuppyService, Puppy } from './puppy.service';

describe('PuppyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuppyService]
    });
  });

  it('should ...', inject([PuppyService], (service: PuppyService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should retrieve puppies from server', () => {
    
    let puppies: Puppy[];
    
    service.puppies.subscribe((result) => {
      puppies = result;
    })
    service.loadAll().then(() =>{
      let len = this.puppies.length;
      
      let puppy: Puppy = { _id: null, name: 'TestDog', breed: 'TestBreed', color: 'TestColor' }
      service.create(puppy).then(() => {
        expect(puppies.length).toBeEqualTo(len + 1);
      })
    });
  })
});
