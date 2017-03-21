import { Component } from '@angular/core';
import { UsersServiceService } from './users/users-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersServiceService]
})
export class AppComponent {
  title = 'app works!';
  private token = '';

  constructor(private usersServiceService: UsersServiceService){}

  isAdmin() {
    return this.token == '' ? false : true;
  }

  ngDoCheck(){
    this.token = this.usersServiceService.getCurrentUserFromLocalStorage().token;
  }

  logout(){
    this.usersServiceService.logoutUser();
    this.token = '';
  }
  //user = UsersServiceService;
}