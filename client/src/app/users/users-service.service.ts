
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {UsersList} from './users';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';
 
@Injectable()
export class UsersServiceService{
 
    constructor(private http: Http, private router: Router){ }
    
    login(obj: UsersList) {
        const body = obj;
         
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
         
        return this.http.post('http://localhost:3000/api/login/', body)
                        .map((resp:Response)=>{
                            this.setCurrentUserToLocalStorage(resp.json());
                        })
                        .catch((error:any) =>{return Observable.throw(error);});

    }

    setCurrentUserToLocalStorage(obj: any) {
        localStorage.setItem('currentUser', JSON.stringify({ 
            token: obj.token,
            name: obj.full_name }));

            this.router.navigateByUrl('/');          
    }

    getCurrentUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    logoutUser() {
        localStorage.setItem('currentUser', JSON.stringify({ 
            token: '',
            name: '' }));
    }

    getAllUsers() { console.log('users');
        let headers = new Headers({ 'X-Auth-Token': this.getCurrentUserFromLocalStorage().token });
        
        
        return this.http.post('http://localhost:3000/api/login/', {'qwwqe':'asds'})
                                .map((resp:Response)=>{
                                    this.setCurrentUserToLocalStorage(resp.json());
                                })
                                .catch((error:any) =>{return Observable.throw(error);});
    }
}