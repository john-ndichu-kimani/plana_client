import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/users/user-service.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
constructor(private userService:UserService){
this.loadProfile();
}

imageUrl:string='';
name:string='';
email:string='';


loadProfile(): void {
  this.userService.getUserProfile().subscribe(
    (response: { profile: User }) => {
      this.imageUrl = response.profile.profile_picture_url || '';
      this.name = `${response.profile.first_name} ${response.profile.last_name}`
    },
    error => {
      console.error('Error loading profile', error);
    }
  );
}

}
