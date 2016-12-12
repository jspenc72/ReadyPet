import { Output, Input, Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Puppy, PuppyService } from '../services/puppy.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'puppy-detail',
  templateUrl: './puppy-detail.component.html',
  styleUrls: ['./puppy-detail.component.scss']
})


export class PuppyDetailComponent implements OnInit {
  puppy: Puppy = { _id:null, name:'', breed:'', color:'' };
  id:string;
  
  isEdit: boolean = false;

  constructor(
    public router:Router,
    public route:ActivatedRoute,
    private puppyService: PuppyService
    ) { }
  
    toggleEdit(){
        this.isEdit = !this.isEdit;
        if(!this.isEdit){
            this.router.navigate(['..'], {relativeTo: this.route.firstChild});
        }else{
            this.router.navigate(['./edit'], {relativeTo: this.route});
        }
    }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    
    this.router.events.subscribe((event) => {
        this.isEdit = this.route.firstChild !== null;
    })
    
    // get puppy from api using id
    var puppyObj = this.puppyService.puppies.map(puppies => puppies.find(item => item._id == this.id));
    this.puppyService.load(this.id).then(() => {
        puppyObj.subscribe((puppy) => {
            this.puppy = puppy;
        })
    });
  }
}
