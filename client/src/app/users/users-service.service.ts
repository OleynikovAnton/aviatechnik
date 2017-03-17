
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {UsersList} from './users';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class UsersServiceService{
 
    constructor(private http: Http){ }
     
    postData(obj: UsersList){
        const body = JSON.stringify(obj);
         
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8', 'X-Acess-Token': '7f1649e8f391f4f851da7da56787e77276a94e0ff14f2670394f8ebf35f63d91' });
         
        return this.http.post('http://localhost:3000/api/users/', body, { headers: headers })
                        .map((resp:Response)=>resp.json())
                        .catch((error:any) =>{return Observable.throw(error);}); 
    }
}