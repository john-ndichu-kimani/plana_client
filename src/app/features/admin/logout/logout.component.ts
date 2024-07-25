import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
constructor(private router:Router){}
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login'])
}
cancel(){
  this.router.navigate(['/user/events'])
}
}
