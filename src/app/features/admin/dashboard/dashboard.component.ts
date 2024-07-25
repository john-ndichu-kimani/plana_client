import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CalenderComponent } from "../../calender/calender.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, CalenderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
