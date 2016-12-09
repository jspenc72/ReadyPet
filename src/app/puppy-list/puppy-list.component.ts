import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '../pipes/search.pipe';
import { Puppy, PuppyService } from '../services/puppy.service';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

@Component({
  selector: 'puppy-list',
  templateUrl: './puppy-list.component.html',
  styleUrls: ['./puppy-list.component.scss']
})

export class PuppyListComponent implements OnInit {
  searchStr: string = '';
  puppies: Observable<Puppy[]>;
  
  onSearch(search){
    this.searchStr = search;
  }
  
  onClick(puppy){
    this.router.navigate(['/puppy/'+puppy._id]);
  }
  
  deleteRow($event, puppy: Puppy){
    $event.stopPropagation();
    this.puppyService.remove(puppy._id).then(() => {
      this.puppyService.loadAll();
    });
  }
  
  constructor(public router:Router, private puppyService: PuppyService) { }

  ngOnInit() {
    this.puppies = this.puppyService.puppies;
    
    this.puppyService.loadAll();
  }

}
