import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


export interface Puppy{
    _id: string,
    name: string,
    breed: string,
    color: string
}

@Injectable()
export class PuppyService {
    puppies: Observable<Puppy[]>
    private _puppies: BehaviorSubject<Puppy[]>;
    private baseUrl: string;
    private dataStore: {
        puppies: Puppy[]
    }
    
    constructor(private http: Http) { 
        this.baseUrl = "http://edwardhoward.io:8080/api/puppies/";
        this.dataStore = { puppies: [] };
        this._puppies = <BehaviorSubject<Puppy[]>> new BehaviorSubject([]);
        this.puppies = this._puppies.asObservable();
    }
    
    private responseToJson(res:Response){
        return res.json() || {};
    }
    
    private handleError(err:Response){
        console.error(err.toString());    
    }
    
    // Load all puppies
    loadAll() {
        return this.http.get(this.baseUrl).map(this.responseToJson)
            .map(data => {
                this.dataStore.puppies = data;
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Load single puppy by Id
    load(id){
        return this.http.get(this.baseUrl + id).map(this.responseToJson)
            .map(data => {
                let notFound = true;
                this.dataStore.puppies.forEach((item, index) => {
                    if(item._id === data._id){
                        this.dataStore.puppies[index] = data;
                        notFound = false;
                    }
                });
                
                if(notFound){
                    this.dataStore.puppies.push(data);
                }
                
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Create puppy
    create(puppy: Puppy) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + 'create', JSON.stringify(puppy), options)
            .map(this.responseToJson).map(data => {
                this.dataStore.puppies.push(data);
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Update puppy
    update(puppy: Puppy){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.baseUrl + puppy._id, JSON.stringify(puppy), options)
            .map(this.responseToJson).map(data => {
                this.dataStore.puppies.forEach((puppy, i) => {
                    if(puppy._id === data._id){
                        this.dataStore.puppies[i] = data;
                    }  
                });
                
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Remove puppy
    remove(puppyId: string){
        return this.http.delete(this.baseUrl + puppyId)
            .map(response => {
                this.dataStore.puppies.forEach((puppy, i) => {
                    if(puppy._id == puppyId){
                        this.dataStore.puppies.splice(i, 1);
                    }
                });
                
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }

}
