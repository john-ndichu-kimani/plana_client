import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users/user-service.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
 profileUrl:string = '';
 username: string = '';
  constructor(private userService:UserService){
   this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response: { profile: User }) => {
        this.profileUrl = response.profile.profile_picture_url || '';
        this.username =response.profile.username;
      },
      error => {
        console.error('Error loading profile', error);
      }
    );
  }

}
