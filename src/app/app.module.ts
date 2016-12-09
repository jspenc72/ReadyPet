import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { PuppyListComponent } from './puppy-list/puppy-list.component';
import { PuppyFormComponent } from './puppy-form/puppy-form.component';
import { PuppyDetailComponent } from './puppy-detail/puppy-detail.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './404/404.component';
import { SearchPipe } from './pipes/search.pipe';

import { PuppyService } from './services/puppy.service';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
    { path: 'puppies', component: PuppyListComponent },
    { path: 'puppies/add', component: PuppyFormComponent },
    { path: 'puppy/:id', component: PuppyDetailComponent, 
        
        children: [
            { path: 'edit', component: PuppyFormComponent }    
        ]
    },
    { path: '', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
];
  
@NgModule({
  declarations: [
    AppComponent,
    PuppyListComponent,
    PuppyDetailComponent,
    PuppyFormComponent,
    SearchComponent,
    HomeComponent,
    NotFoundComponent,
    SearchPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PuppyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
