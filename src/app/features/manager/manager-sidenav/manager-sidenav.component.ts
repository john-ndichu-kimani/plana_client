import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users/user-service.service';

@Component({
  selector: 'app-manager-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manager-sidenav.component.html',
  styleUrl: './manager-sidenav.component.css'
})
export class ManagerSidenavComponent {
  name:string='';
  email:string = '';
  imageUrl:string = '';

constructor(private userService:UserService){
  this.loadProfile();
}

loadProfile(){
  this.userService.getUserProfile().subscribe(res=>{
this.name = `${res.profile.first_name} ${res.profile.last_name}`;
this.email = res.profile.email;
this.imageUrl=res.profile.profile_picture_url as string
  })
}
}
