import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    model: string = '';
    timeout;
  
    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
    
    constructor() { }
    
    search(){
    // emits search to list component
        this.onSearch.emit(this.model);
    }
  
    onKey(event:any){
        // search on 'Enter' key
        if(event.keyCode == 13){
            this.search();
        }else{
            // debounce the function
            let self = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.search();
            }, 300)
        }
    }
    
    ngOnInit() { }
}
