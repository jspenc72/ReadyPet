import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == undefined){
      return value;
    }
  
    let filter = args.toLowerCase();
    
    // loop through properties and find any matches
    let filteredValue = value.filter(function(el){
        for(var prop in el){
            if(el.hasOwnProperty(prop) && typeof el[prop] === 'string'){
                if(el[prop].toLowerCase().indexOf(filter) > -1){
                  return true;
                }
            }
        }
    });
    
    return filteredValue;
  }

}
