import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
