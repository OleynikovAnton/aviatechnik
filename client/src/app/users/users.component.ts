


import { Component, OnInit } from '@angular/core';
import { UsersServiceService} from './users-service.service';
import { UsersList } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersServiceService]
})


export class UsersComponent {   
    users: {};
    // users: UsersList=new UsersList(); // данные вводимого пользователя
     
    // receivedUser: UsersList; // полученный пользователь
    // done: boolean = false;
    constructor(private usersServiceService: UsersServiceService){}

    ngDoCheck() {
        this.users = this.usersServiceService.getAllUsers();
         console.log(this.users)
    }
}


