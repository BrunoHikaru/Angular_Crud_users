import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userName:string | null;
  userCount: number = 0; 
  maxUsers: number = 10; 
  planCount: number = 0;
  maxPlanCount: number = 20;
  lastUser: any = {};

  constructor(private usersService: UsersService) {}
  
  ngOnInit(){
    this.userName = sessionStorage.getItem('user');
    this.usersService.getUsersCount().subscribe(count => {
      this.userCount = count;
    });
    this.usersService.getPlansCount().subscribe(count => {
      this.planCount = count;
    })

    this.usersService.getLastUser().subscribe(users => {
      this.lastUser = users.map(u => {
        const data = u.payload.doc.data() as User; 
        return { id: u.payload.doc.id, ...data };
      });
    });
    
  }
}
