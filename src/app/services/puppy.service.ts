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
        return this.http.get(this.baseUrl)
            .map(data => {
                
                this.dataStore.puppies = this.responseToJson(data);
                
                // trigger observable
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Load single puppy by Id
    load(id:string, forceLoad?:boolean){
        
        return this.http.get(this.baseUrl + id)
            .map(data => {
                let jsonData = this.responseToJson(data);
                let notFound = true;
                
                // Update puppy if it already exists..
                this.dataStore.puppies.forEach((item, index) => {
                    if(item._id === jsonData._id){
                        this.dataStore.puppies[index] = jsonData;
                        notFound = false;
                    }
                });
                
                // ..otherwise add it
                if(notFound){
                    this.dataStore.puppies.push(jsonData);
                }
                
                // trigger observable
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Create puppy
    create(puppy: Puppy) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + 'create', JSON.stringify(puppy), options)
            .map(data => {
                
                // Store new puppy
                let jsonData = this.responseToJson(data);
                this.dataStore.puppies.push(jsonData);
                
                // trigger observable
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
                
            }).toPromise().catch(this.handleError);
    }
    
    // Update puppy
    update(puppy: Puppy){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.baseUrl + puppy._id, JSON.stringify(puppy), options)
            .map(data => {
                let jsonData = this.responseToJson(data);
                
                // Find the puppy and replace data with new data
                this.dataStore.puppies.forEach((puppy, i) => {
                    if(puppy._id === jsonData._id){
                        this.dataStore.puppies[i] = jsonData;
                    }  
                });
                
                // trigger observable
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
            }).toPromise().catch(this.handleError);
    }
    
    // Remove puppy
    remove(puppyId: string){
        return this.http.delete(this.baseUrl + puppyId)
            .map(response => {
                
                // Remove puppy from the dataStore
                this.dataStore.puppies = this.dataStore.puppies.filter((puppy) => puppy._id != puppyId);

                // trigger observable
                this._puppies.next(Object.assign({}, this.dataStore).puppies);
                
            }).toPromise().catch(this.handleError);
    }
}
