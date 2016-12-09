import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    open = false;
    options = [{url: '/puppies', title: 'Puppies', enabled: 'true', }, {url: '/kittens', title: 'Kittens', enabled: 'false'}];
    toggleNav(){
        this.open = !this.open;
    }
    
    closeNav(){
        this.open = false;
    }
    
    constructor(public router:Router){}
}