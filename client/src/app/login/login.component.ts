import { Component, OnInit } from '@angular/core';
import {UsersList} from '../users/users';
import {Response, Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { UsersServiceService} from '../users/users-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersServiceService]
})

export class LoginComponent {   
    users: UsersList=new UsersList(); // данные вводимого пользователя
     
    receivedUser: UsersList; // полученный пользователь
    done: boolean = false;
    constructor(private usersServiceService: UsersServiceService){}
    submit(users){ 
        this.usersServiceService.login(users)
                .subscribe((data) => {this.receivedUser=data; this.done=true;});
    }
}
