import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Search } from '../classes/search';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  model: Search = new Search('');

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  
  search(){
    // emits search to list component
    this.onSearch.emit(this.model.search);
  }
  
  onKey(event:any){
    // search on 'Enter' key
    if(event.keyCode == 13){
      this.search();
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
