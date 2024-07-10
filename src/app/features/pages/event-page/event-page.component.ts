import { Component } from '@angular/core';
import { EventsComponent } from "../../landing/events/events.component";
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [NavbarComponent,EventsComponent,FooterComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

}
