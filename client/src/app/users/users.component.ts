
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
    users: UsersList=new UsersList(); // данные вводимого пользователя
     
    receivedUser: UsersList; // полученный пользователь
    done: boolean = false;
    constructor(private usersServiceService: UsersServiceService){}
    submit(users){
        this.usersServiceService.postData(users)
                .subscribe((data) => {this.receivedUser=data; this.done=true;});
    }
}


