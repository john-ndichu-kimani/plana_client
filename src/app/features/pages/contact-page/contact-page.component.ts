import { Component } from '@angular/core';
import { ContactComponent } from "../../landing/contact/contact.component";
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent,ContactComponent,FooterComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

}
