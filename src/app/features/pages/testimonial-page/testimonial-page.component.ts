import { Component } from '@angular/core';
import { ContactComponent } from "../../landing/contact/contact.component";
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { TestimonialsComponent } from '../../landing/testimonials/testimonials.component';

@Component({
  selector: 'app-testimonial-page',
  standalone: true,
  imports: [NavbarComponent,TestimonialsComponent,ContactComponent,FooterComponent],
  templateUrl: './testimonial-page.component.html',
  styleUrl: './testimonial-page.component.css'
})
export class TestimonialPageComponent {

}
