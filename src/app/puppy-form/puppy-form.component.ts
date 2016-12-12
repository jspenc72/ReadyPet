import { Component, OnInit } from '@angular/core';
import { Puppy, PuppyService } from '../services/puppy.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'puppy-form',
    templateUrl: './puppy-form.component.html',
    styleUrls: ['./puppy-form.component.scss']
})
export class PuppyFormComponent implements OnInit {
    model:Puppy = { _id:null, name:'', breed:'', color:'' };
    id:string = null;
    canSubmit: boolean = true;
  
  
    constructor(
        public router:Router, 
        public route:ActivatedRoute,
        private puppyService:PuppyService
    ) { }
  
    onSubmit(){
        // Stop multiple clicks
        if(!this.canSubmit) return;
        
        this.canSubmit = false;
        // If there isn't an id we want to create a new one, otherwise we update
        if(this.id == null){
            this.puppyService.create(this.model).then(() => {
                // Navigate back to puppy list
                this.router.navigate(['/puppies']);
            });
        }else{
            this.puppyService.update(this.model).then(() => {
                // Close edit dialog
                this.router.navigate(['..'], {relativeTo: this.route});
            });
        }
      
    }
    
    ngOnInit() {
        // Get id from the route
        this.route.parent.params.subscribe(params => {
            if(params['id']){
                this.id = params['id'];
            }
        })
        
        // if Id exists get the puppy
        if(this.id != null){
            var puppies = this.puppyService.puppies.map(puppies => puppies.find(item => item._id == this.id))
            this.puppyService.load(this.id).then(() => {
                // subscribe to the puppy
                puppies.subscribe( model => {
                    this.model = model;
                });
            });
        }
    }
}
