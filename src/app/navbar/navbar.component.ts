import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    open = false;
    options = [{url: '/puppies', title: 'Puppies' }, {url: '/kittens', title: 'Kittens' }];
    
    constructor(public router:Router){}
    
    toggleNav(){
        this.open = !this.open;
    }
    
    closeNav(){
        this.open = false;
    }
}