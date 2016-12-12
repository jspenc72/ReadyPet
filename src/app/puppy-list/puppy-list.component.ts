import { Component, OnInit  } from '@angular/core';
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
  puppies: Puppy[];

  constructor( public router:Router, private puppyService: PuppyService ) { }
  
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
    })
  }

  ngOnInit() {
    this.puppyService.puppies.subscribe((result) => {
      this.puppies = result;
    });
    
    this.puppyService.loadAll();
  }

}
