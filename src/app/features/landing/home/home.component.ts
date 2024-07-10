import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { StatcountComponent } from '../statcount/statcount.component';
import { EventsComponent } from '../events/events.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,StatcountComponent,AboutUsComponent,EventsComponent,TestimonialsComponent,ContactComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
